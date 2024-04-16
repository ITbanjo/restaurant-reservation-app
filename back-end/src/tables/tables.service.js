const knex = require("../db/connection");

function getTables() {
  return knex("tables")
    .select("table_id", "table_name", "capacity", "reservation_id")
    .orderBy("table_name");
}

function read(id) {
  return knex("tables")
    .select("table_id", "table_name", "capacity", "reservation_id")
    .where("table_id", id)
    .first();
}

// function readTableReservation() {
//     return knex("tables as t").join("reservations as r", "r.reservation_id", "t.reservation_id").select("*").where()
// }

function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

function updateTableSeat(updatedTableSeat) {
  return knex("tables")
    .select("*")
    .where("table_id", updatedTableSeat.table_id)
    .update(updatedTableSeat, "*")
    .then((updateData) => updateData[0]);
}
module.exports = {
  getTables,
  read,
  create,
  updateTableSeat,
};
