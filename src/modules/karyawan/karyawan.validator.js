const { body, param } = require("express-validator");
const { User, Karyawan } = require("../../db/models/index.js");

const createKaryawanValidator = [
  body("nama_karyawan")
    .trim()
    .notEmpty()
    .withMessage("Nama karyawan wajib diisi")
    .bail()
    .matches(/^[a-zA-Z]$/)
    .withMessage("Nama karyawan harus berupa huruf")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Nama karyawan maksimal 50 karakter"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username wajib diisi")
    .bail()
    .custom(async (username) => {
      const user = await User.findOne({
        where: { username },
      });
      if (!user) {
        throw new Error("Username tidak valid");
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

module.exports = { createKaryawanValidator };
