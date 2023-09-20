/**
 * List handler for reservation resources
*/
const service = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function create(req, res) {
  const newReservation = await service.create(req.body.data);

  res.status(201).json({
    data: newObservation,
  })
}

async function list(req, res) {
  const data = await service.list();
    res.json({
      data,
    });
}

module.exports = {
  create: [asyncErrorBoundary(create)],
  list,
};
