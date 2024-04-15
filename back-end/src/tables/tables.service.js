const knex = require("../db/connection");

function getTables() {
  return knex("tables")
    .distinct("table_id", "table_name", "capacity", "reservation_id")
    .orderBy("table_name");
}

function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

module.exports = {
  getTables,
  create,
};
