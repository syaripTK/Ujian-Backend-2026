const { body, param, query } = require("express-validator");
const { Cuti } = require("../../db/models/index.js");

const idParamsValidator = [
  param("id").toInt().isInt({ min: 1 }).withMessage("Id params tidak valid"),
];

const paramStatusValidator = [
  param("st")
    .isIn(["pending", "ditolak", "disetujui"])
    .withMessage("Params status tidak valid"),
];

module.exports = { idParamsValidator, paramStatusValidator };
