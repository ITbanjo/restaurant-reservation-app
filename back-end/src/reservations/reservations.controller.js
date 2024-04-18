const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//input validation functions
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

function dateIsOnDayOpenForBusiness(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const weekdayName = new Date(reservation_date).toUTCString().slice(0, 3);

  if (weekdayName != "Tue") {
    return next();
  }
  next({
    status: 400,
    message: `Periodic Tables is closed on Tuesdays. Please choose another day.`,
  });
}

function timeIsAfterOpening(req, res, next) {
  const { data: { reservation_time } = {} } = req.body;
  const resHours = Number(reservation_time.slice(0, 2));
  const resMinutes = Number(reservation_time.slice(3, 5));
  res.locals.resHours = resHours;
  res.locals.resMinutes = resMinutes;

  if (resHours > 10) return next();
  if (resHours === 10 && resMinutes >= 30) return next();

  next({
    status: 400,
    message: `Reservation cannot be set before 10:30 AM`,
  });
}

function timeIsHourBeforeClosing(req, res, next) {
  const { resHours, resMinutes } = res.locals;

  if (resHours < 21) return next();
  if (resHours === 21 && resMinutes <= 30) return next();

  next({
    status: 400,
    message: `Reservation cannot be set after 9:30 PM`,
  });
}

function dateAndTimeInFuture(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const { resHours, resMinutes } = res.locals;

  const todayDateRaw = new Date();
  const todayDate = todayDateRaw.toUTCString();
  const resDate = new Date(
    new Date(
      `${reservation_date}T${resHours.padStart(2, "0")}:${resMinutes.padStart(
        2,
        "0"
      )}:00.000Z`
    ).getTime() +
      todayDateRaw.getTimezoneOffset() * 60 * 1000
  ).toUTCString();

  if (Date.parse(resDate) > Date.parse(todayDate)) {
    return next();
  }
  next({
    status: 400,
    message: `Date/Time combination cannot be in the past. Please choose a future Date/Time. SentDate: ${resDate} CurrentDate: ${todayDate}`,
  });
}

async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${req.params.reservation_id} cannot be found.`,
  });
}

//middleware functions
async function listForSpecifiedDate(req, res) {
  const date = req.query.date || "NODATE";
  const reservations = await service.getReservationsForSpecifiedDate(date);
  res.json({ data: reservations });
}

function read(req, res) {
  res.json({ data: res.locals.reservation });
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
  read: [asyncErrorBoundary(reservationExists), read],
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
    dateIsOnDayOpenForBusiness,
    timeIsAfterOpening,
    timeIsHourBeforeClosing,
    dateAndTimeInFuture,
    asyncErrorBoundary(create),
  ],
};
