const { body, param, query } = require("express-validator");
const { Cuti } = require("../../db/models/index.js");

const approvementValidator = [
  body("cutiId")
    .trim()
    .notEmpty()
    .withMessage("ID Cuti wajib diisi")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Cuti id harus berupa angka positif"),

  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status wajib diisi")
    .bail()
    .isIn(["ditolak", "disetujui"])
    .withMessage("Status yang valid hanya ditolak atau disetujui"),

  body("catatan")
    .trim()
    .notEmpty()
    .withMessage("Catatan wajib diisi")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Catatan minimal 3 karakter"),
];

const idParamsValidator = [
  param("id").toInt().isInt({ min: 1 }).withMessage("Id params tidak valid"),
];

module.exports = { approvementValidator, idParamsValidator };
