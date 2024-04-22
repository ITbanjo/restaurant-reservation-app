const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Table must include a ${propertyName}`,
    });
  };
}

function tableNameAtLeastTwoChars(req, res, next) {
  const { data: { table_name } = {} } = req.body;
  if (table_name.length >= 2) {
    res.locals.table_name = table_name;
    return next();
  }
  next({
    status: 400,
    message: `table_name must be at least two characters long.`,
  });
}

function capacityMustBeNumber(req, res, next) {
  const { data: { capacity } = {} } = req.body;
  const type = typeof capacity;
  if (type === "number") {
    res.locals.capacity = capacity;
    return next();
  }
  next({
    status: 400,
    message: `table capacity must be a number.`,
  });
}

function capacityGreaterThanZero(req, res, next) {
  if (res.locals.capacity > 0) {
    return next();
  }
  next({
    status: 400,
    message: `Table capacity must be 1 or more.`,
  });
}

async function tableHasSufficientCapacity(req, res, next) {
  const table = await service.read(req.params.table_id);
  res.locals.table = table;
  const reservation = await reservationsService.read(
    res.locals.reservation.reservation_id
  );
  if (table.capacity >= reservation.people) {
    return next();
  }
  next({
    status: 400,
    message: `Table: ${table.table_name} has a capacity of ${table.capacity}, and cannot seat ${reservation.people} people.`,
  });
}

function tableIsNotOccupied(req, res, next) {
  if (!res.locals.table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table: ${res.locals.table.table_name} is occupied`,
  });
}

async function reservationExists(req, res, next) {
  const { data: { reservation_id } = {} } = req.body;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation_id: ${reservation_id} cannot be found.`,
  });
}

async function tableExists(req, res, next) {
  const table = await service.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table: ${req.params.table_id} cannot be found.`,
  });
}

function tableIsOccupied(req, res, next) {
  const { reservation_id, table_name } = res.locals.table;
  if (reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table: ${table_name} is not occupied.`,
  });
}

function tableNotSeated(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "seated") {
    next({
      status: 400,
      message: `Status is already set to "seated."`,
    });
  }
  return next();
}

async function list(req, res) {
  res.json({ data: await service.getTables() });
}

async function create(req, res) {
  const { data: { table_name, capacity, reservation_id = null } = {} } =
    req.body;
  const newTable = {
    table_name: table_name,
    capacity: capacity,
    reservation_id: reservation_id,
  };
  const create = await service.create(newTable);
  res.status(201).json({ data: create[0] });
}

async function updateTableSeat(req, res) {
  const updatedTableSeat = {
    ...res.locals.table,
    ...req.body.data,
  };
  const data = await service.updateTableSeat(updatedTableSeat);
  res.json({ data });
}

async function deleteTableSeat(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = res.locals.table;
  const deletedTableSeat = await service.deleteTableSeat(
    reservation_id,
    table_id
  );
  res.status(200).json({ data: deletedTableSeat });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataHas("table_name"),
    bodyDataHas("capacity"),
    tableNameAtLeastTwoChars,
    capacityMustBeNumber,
    capacityGreaterThanZero,
    asyncErrorBoundary(create),
  ],
  updateTableSeat: [
    bodyDataHas("reservation_id"),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableHasSufficientCapacity),
    tableIsNotOccupied,
    tableNotSeated,
    asyncErrorBoundary(updateTableSeat),
  ],
  deleteTableSeat: [
    asyncErrorBoundary(tableExists),
    tableIsOccupied,
    asyncErrorBoundary(deleteTableSeat),
  ],
};
