const knex = require("../db/connection");

//Helper function for listForSpecifiedDate to give default date if NULL value is passed
function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

function getReservationsForSpecifiedDate(date = asDateString(new Date())) {
  return knex("reservations")
    .distinct(
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
