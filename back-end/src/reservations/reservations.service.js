const knex = require("../db/connection");

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function list() {
    return knex("reservations").select("*");
}

function listByDate(date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .whereNot({ status: "finished" })
      .orderBy("reservation_time", "asc");
  }


module.exports = {
    create,
    list,
    listByDate,
}