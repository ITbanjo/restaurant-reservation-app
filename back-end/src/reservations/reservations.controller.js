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
  const {
    data: {
      reservation_date,
      currentDate = "2024-04-18",
      currentTime = "12:00",
    } = {},
  } = req.body;
  const { resHours, resMinutes } = res.locals;

  const todayValue = Date.parse(currentDate);
  const resDateValue = Date.parse(reservation_date);

  const todayHours = Number(currentTime.slice(0, 2));
  const todayMinutes = Number(currentTime.slice(3, 5));

  if (resDateValue > todayValue) {
    return next();
  }
  if (resDateValue === todayValue) {
    if (resHours > todayHours) return next();
    if (resHours === todayHours && resMinutes > todayMinutes) return next();
    next({
      status: 400,
      message: `Reservation_time cannot be a past time. Please choose a future time. reservation_date=${reservation_date} todayDate=${currentDate} resHoursMins=${resHours}:${resMinutes} todayHoursMins=${todayHours}:${todayMinutes}`,
    });
  }
  next({
    status: 400,
    message: `Reservation_date cannot be a past date. Please choose a future date.`,
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

function reservationStatusIsBooked(req, res, next) {
  const { data: { status = "booked" } = {} } = req.body;
  if (status === "booked") {
    return next();
  }
  next({
    status: 400,
    message: `Reservation status is "${status}". Must be set to "booked" in order to seat`,
  });
}

function statusIsNotUnknown(req, res, next) {
  const { data: { status } = {} } = req.body;
  if (status === "booked" || status === "seated" || status === "finished") {
    return next();
  }
  next({
    status: 400,
    message: `Reservation status is unknown. Valid statuses are "booked", "seated", and "finished".`,
  });
}

function statusIsNotFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    next({
      status: 400,
      message: `A finished reservation cannot be updated`,
    });
  }
  return next();
}

//middleware functions
async function listForSpecifiedDateOrPhoneNumber(req, res) {
  const date = req.query.date; //|| "NODATE";
  const phoneNumber = req.query.mobile_number; //|| "NONUMBER"
  let reservations;
  if (date) {
    res.json({ data: await service.getReservationsForSpecifiedDate(date) });
  }
  if (phoneNumber) {
    res.json({
      data: await service.searchReservationsForSpecifiedPhoneNumber(
        phoneNumber
      ),
    });
  }

  //res.json({ data: reservations });
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

async function updateReservationStatus(req, res) {
  const { data: { status = "booked" } = {} } = req.body;
  const { reservation_id } = req.params;
  const data = await service.updateReservationStatus(reservation_id, status);
  res.status(200).json({ data });
}

module.exports = {
  listForSpecifiedDateOrPhoneNumber: [
    asyncErrorBoundary(listForSpecifiedDateOrPhoneNumber),
  ],
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
    reservationStatusIsBooked,
    asyncErrorBoundary(create),
  ],
  updateReservationStatus: [
    asyncErrorBoundary(reservationExists),
    statusIsNotUnknown,
    statusIsNotFinished,
    asyncErrorBoundary(updateReservationStatus),
  ],
};
