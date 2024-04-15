const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const tables = await service.getTables();
  res.json({ data: tables });
}

async function create(req, res) {
  const { data: { table_name, capacity } = {} } = req.body;
  const newTable = {
    table_name: table_name,
    capacity: capacity,
  };
  const create = await service.create(newTable);
  res.status(201).json({ data: create[0] });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
};
