const knex = require("../db/connection");

function getReservationsForSpecifiedDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
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
