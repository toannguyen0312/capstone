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

const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people");

function dateIsValid (req, res) {
  const { reservation_date} = req.body.data;
  const isDate = Date.parse(reservation_date);

  if(!Number.isNaN(isDate)) {
    res.locals.reservation_date = reservation_date;
    return next();
  }
  next({
    status: 400,
    message: `reservation_date is not a valid date`,
  })
}

function timeIsValid(req, res, next) {
  const { reservation_time } = req.body.data;
  const isTime = reservation_time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
  if (isTime) {
    res.locals.reservation_time = reservation_time;
    return next();
  } else {
    next({
      status: 400,
      message: `reservation_time is not a valid time.`,
    });
  }
}

async function create(req, res) {
  const newReservation = await service.create(...req.body.data);

  res.status(201).json({
    data: newReservation,
  })
}

async function list(req, res) {
  const { date } = req.query;
  let data;
  if(date) {
    data = await service.listByDate(date);
  }
  res.status(201).json({data});
}

module.exports = {
  create: [hasOnlyValidProperties, hasProperties, hasRequiredProperties, dateIsValid, timeIsValid, asyncErrorBoundary(create)],
  list: [asyncErrorBoundary(list)],
};
