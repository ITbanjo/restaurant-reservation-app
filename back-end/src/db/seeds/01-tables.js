exports.seed = function (knex) {
  return knex("tables").insert([
    {
      table_name: "Bar #1",
      capacity: 1,
      reservation_id: 2,
    },
    {
      table_name: "Bar #2",
      capacity: 1,
      reservation_id: 3,
    },
    {
      table_name: "#1",
      capacity: 6,
      reservation_id: 1,
    },
    {
      table_name: "#2",
      capacity: 6,
    },
  ]);
};
