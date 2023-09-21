/**
 * List handler for reservation resources
*/
const service = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasOnlyValidProperties (req, res, next) {
  const { data= {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if(invalidFields.length) {
    return next ({
      status:400,
      message:`Invalid field(s): ${invalidFields.join(", ")}`,
    })
  }
  next();
}

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      properties.forEach((property) => {
        if(!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next()
    } catch(error) {
      next(error);
    }
  };
}

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
