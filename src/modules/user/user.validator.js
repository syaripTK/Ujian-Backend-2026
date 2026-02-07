const { body, param } = require("express-validator");
const { User } = require("../../db/models/index.js");

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

const createValidator = [
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

  body("role")
    .optional()
    .isIn(["admin", "user", "kabagppa", "kabagumum"])
    .withMessage("Role tidak valid"),
];

const updateValidator = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("Id param wajib diisi")
    .bail()
    .isNumeric()
    .withMessage("Id param harus berupa angka"),

    
];

module.exports = {
  registerValidator,
  loginValidator,
  createValidator,
};
