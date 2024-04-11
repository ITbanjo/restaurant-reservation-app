const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Reservation must include a ${propertyName}`,
    });
  };
}

function dateIsValid(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const date = new Date(reservation_date);
  if (!isNaN(date)) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_date must be a valid date.`,
  });
}

function timeIsValid(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
    reservation_time
  );
  if (isValid) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_time must be a valid time.`,
  });
}

function peopleIsInt(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (Number.isInteger(people)) {
    return next();
  }
  next({
    status: 400,
    message: `Number of people must be an integer.`,
  });
}

//Helper function for listForSpecifiedDate to give default date if NULL value is passed
function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

async function listForSpecifiedDate(req, res) {
  //const today = asDateString(new Date());
  const date = req.query.date;
  const reservations = await service.getReservationsForSpecifiedDate(date);
  res.json({ data: reservations });
}

async function create(req, res) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    } = {},
  } = req.body;
  const newReservation = {
    first_name: first_name,
    last_name: last_name,
    mobile_number: mobile_number,
    reservation_date: reservation_date,
    reservation_time: reservation_time,
    people: people,
  };
  const create = await service.create(newReservation);
  res.status(201).json({ data: create[0] });
}

module.exports = {
  listForSpecifiedDate: [asyncErrorBoundary(listForSpecifiedDate)],
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    dateIsValid,
    timeIsValid,
    peopleIsInt,
    asyncErrorBoundary(create),
  ],
};
