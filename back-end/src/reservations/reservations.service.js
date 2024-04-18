const knex = require("../db/connection");

function getReservationsForSpecifiedDate(date) {
  return knex("reservations")
    .select(
      "reservation_id",
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    )
    .where("reservation_date", date)
    .orderBy("reservation_time");
}

function read(id) {
  return knex("reservations")
    .select(
      "reservation_id",
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    )
    .where("reservation_id", id)
    .first();
}

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

module.exports = {
  read,
  create,
  getReservationsForSpecifiedDate,
};
