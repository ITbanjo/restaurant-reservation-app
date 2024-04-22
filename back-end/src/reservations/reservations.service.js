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
      "people",
      "status"
    )
    .where("reservation_date", date)
    .andWhere("status", "<>", "finished")
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
      "people",
      "status"
    )
    .where("reservation_id", id)
    .first();
}

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

async function updateReservationStatus(reservation_id, status) {
  return knex("reservations")
    .where("reservation_id", reservation_id)
    .update({ status: status }, ["status"])
    .then((data) => data[0]);
}

module.exports = {
  read,
  create,
  getReservationsForSpecifiedDate,
  updateReservationStatus,
};
