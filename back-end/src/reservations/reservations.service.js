const knex = require("../db/connection");

function getReservationsForSpecifiedDate(date) {
  return knex("reservations")
    .distinct(
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

function list() {
  return knex("reservations").select("*");
}

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

module.exports = {
  list,
  create,
  getReservationsForSpecifiedDate,
};
