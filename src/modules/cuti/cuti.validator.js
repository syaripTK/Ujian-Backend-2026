const { body, param, query } = require("express-validator");
const { Cuti } = require("../../db/models/index.js");

const cutiValidator = [
  body("tgl_mulai")
    .trim()
    .notEmpty()
    .withMessage("Tanggal mulai wajib diisi")
    .bail()
    .isISO8601()
    .withMessage("Format tanggal tidak valid"),

  body("tgl_selesai")
    .trim()
    .notEmpty()
    .withMessage("Tanggal selesai wajib diisi")
    .bail()
    .isISO8601()
    .withMessage("Format tanggal tidak valid")
    .bail()
    .custom((val, { req }) => {
      if (val <= req.body.tgl_mulai) {
        throw new Error(
          "Maaf, tanggal selesai harus lebih besar dari tanggal mulai",
        );
      }
      return true;
    }),

  body("alasan").trim().notEmpty().withMessage("Alasan wajib diisi"),
];

const idParamsValidator = [
  param("id").toInt().isInt({ min: 1 }).withMessage("Id params tidak valid"),
];

module.exports = { cutiValidator, idParamsValidator };
