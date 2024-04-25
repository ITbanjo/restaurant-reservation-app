const knex = require("../db/connection");

function getReservationsForSpecifiedDate(date) {
  return (
    knex("reservations")
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
      .whereNotIn("status", ["finished", "cancelled"])
      .andWhere("reservation_date", date)
      //.andWhere("status", "<>", "finished")
      .orderBy("reservation_time")
  );
}

function searchReservationsForSpecifiedPhoneNumber(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
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

function edit(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where("reservation_id", updatedReservation.reservation_id)
    .update(updatedReservation, "*", ["*"])
    .then((data) => data[0]);
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
  edit,
  getReservationsForSpecifiedDate,
  searchReservationsForSpecifiedPhoneNumber,
  updateReservationStatus,
};
