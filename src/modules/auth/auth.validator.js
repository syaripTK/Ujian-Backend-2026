const { body, param } = require("express-validator");
const { User } = require("../../db/models/index.js");
const { comparePassword } = require("../../shared/utils/helpers.js");

const registerValidator = [
  body("nama").trim().notEmpty().withMessage("Nama wajib diisi"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username wajib diisi")
    .bail()
    .custom(async (username) => {
      const user = await User.findOne({ where: { username } });
      if (user != null) {
        throw new Error("Username sudah ada, silahkan isi yang lain");
      }
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email wajib diisi")
    .bail()
    .isEmail()
    .withMessage("Format email tidak valid")
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error("Email sudah terdaftar");
      }
      return true;
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password wajib diisi")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),

  body("konfirmasi-password")
    .trim()
    .notEmpty()
    .withMessage("Konfirmasi password wajib diisi")
    .bail()
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Konfirmasi password tidak sama dengan password");
      }
      return true;
    }),
];

const loginValidator = [
  body("username").trim().notEmpty().withMessage("Username wajib diisi"),
  body("password").trim().notEmpty().withMessage("Password wajib diisi"),
];

const idParamsValidator = [
  param("id")
    .toInt()
    .notEmpty()
    .withMessage("Id param wajib diisi")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Id param harus berupa angka positif"),
];

const changeValidator = [
  body("password_lama")
    .trim()
    .notEmpty()
    .withMessage("Password lama wajib diisi")
    .bail()
    .custom(async (val, { req }) => {
      const user = await User.findByPk(req.user.id);
      const isMatch = await comparePassword(val, user.password);
      if (!isMatch) {
        throw new Error("Maaf, password lama tidak valid");
      }
      return true;
    }),

  body("password_baru")
    .trim()
    .notEmpty()
    .withMessage("Password baru wajib diisi")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password baru minimal 6 karakter")
    .bail()
    .custom((val, { req }) => {
      if (val === req.body.password_lama) {
        throw new Error("Password baru tidak boleh sama dengan password lama");
      }
      return true;
    }),

  body("konfirmasi-password")
    .trim()
    .notEmpty()
    .withMessage("Konfirmasi password wajib diisi")
    .bail()
    .custom((val, { req }) => {
      if (val !== req.body.password_baru) {
        throw new Error("Konfirmasi password tidak sama dengan password baru");
      }
      return true;
    }),
];

changeUsnValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username wajib diisi")
    .bail()
    .custom(async (username) => {
      const user = await User.findOne({ where: { username } });
      if (user != null) {
        throw new Error("Username sudah ada, silahkan isi yang lain");
      }
      return true;
    }),
];

module.exports = {
  registerValidator,
  loginValidator,
  idParamsValidator,
  changeValidator,
  changeUsnValidator
};
