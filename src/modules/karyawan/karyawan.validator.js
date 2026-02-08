const { body, param, query } = require("express-validator");
const { User, Karyawan } = require("../../db/models/index.js");

const createKaryawanValidator = [
  body("nama_karyawan")
    .trim()
    .notEmpty()
    .withMessage("Nama karyawan wajib diisi")
    .bail()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Nama karyawan tidak valid")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Nama karyawan maksimal 50 karakter"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username wajib diisi")
    .bail()
    .isLength({ max: 20 })
    .withMessage("Username maksimal 20 karakter")
    .bail()
    .custom(async (username) => {
      const user = await User.findOne({
        where: { username },
      });
      if (!user) {
        throw new Error(
          "Username harus sama dengan data username di table user",
        );
      }
      const duplicate = await Karyawan.findOne({
        where: { username },
      });
      if (duplicate !== null) throw new Error("Username sudah terdaftar");
      return true;
    }),

  body("jabatan")
    .trim()
    .notEmpty()
    .withMessage("Jabatan wajib diisi")
    .bail()
    .isLength({ max: 20 })
    .withMessage("Jabatan maksimal 20 karakter"),

  body("alamat").trim().notEmpty().withMessage("Alamat wajib diisi"),
];

const idParamsValidator = [
  param("id").toInt().isInt({ min: 1 }).withMessage("Id params tidak valid"),
];

const queryValidator = [
  query("nama")
    .trim()
    .notEmpty()
    .withMessage("Query tidak boleh kosong")
    .bail()
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Format query tidak valid"),
];

const upgradeValidator = [
  body("nama_karyawan")
    .trim()
    .notEmpty()
    .withMessage("Nama karyawan wajib diisi")
    .bail()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Nama karyawan tidak valid")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Nama karyawan maksimal 50 karakter"),

  body("jabatan")
    .trim()
    .notEmpty()
    .withMessage("Jabatan wajib diisi")
    .bail()
    .isLength({ max: 20 })
    .withMessage("Jabatan maksimal 20 karakter"),

  body("alamat").trim().optional(),
];

module.exports = { createKaryawanValidator, idParamsValidator, queryValidator, upgradeValidator };
