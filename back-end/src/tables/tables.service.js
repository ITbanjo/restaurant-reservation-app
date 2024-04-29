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

function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

async function updateTableSeat(data) {
  const { reservation_id, table_id } = data;
  return await knex.transaction((trx) => {
    return Promise.all([
      knex("tables")
        .where("table_id", table_id)
        .update("reservation_id", reservation_id)
        .transacting(trx),
      knex("reservations")
        .where("reservation_id", reservation_id)
        .update("status", "seated")
        .transacting(trx),
    ]);
  });
}

async function deleteTableSeat(reservation_id, table_id) {
  return await knex.transaction((trx) => {
    return Promise.all([
      knex("tables")
        .where("table_id", table_id)
        .update("reservation_id", null)
        .transacting(trx),
      knex("reservations")
        .where("reservation_id", reservation_id)
        .update("status", "finished")
        .transacting(trx),
    ]);
  });
}

module.exports = {
  getTables,
  read,
  create,
  updateTableSeat,
  deleteTableSeat,
};
