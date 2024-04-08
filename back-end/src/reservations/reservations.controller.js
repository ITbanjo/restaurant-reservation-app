const service = require("./reservations.service");

async function list(req, res) {
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
    } = {},
  } = req.body;
  const newReservation = {
    first_name: first_name,
    last_name: last_name,
    mobile_number: mobile_number,
    reservation_date: reservation_date,
    reservation_time: reservation_time,
  };
  const create = await service.create(newReservation);
  res.status(201).json({ data: create[0] });
}

module.exports = {
  list,
  create,
};
