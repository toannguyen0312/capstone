const knex = require("../db/connection");

function create(newREservation) {
    return knex("reservations").insert(newReservation).returning("*");
}

function list() {
    return knex("reservations").select("*");
}


module.exports = {
    create,
    list,
}