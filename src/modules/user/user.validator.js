const { body, param, query } = require("express-validator");
const { User } = require("../../db/models/index.js");

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

const idParamsValidator = [
  param("id").toInt().isInt({ min: 1 }).withMessage("Id params tidak valid"),
];

const updateUserValidator = [
  param("id").toInt().isInt({ min: 1 }).withMessage("Id params tidak valid"),

  body("nama")
    .trim()
    .optional()
    .isLength({ max: 50 })
    .withMessage("Nama maksimal 50 karakter")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Nama minimal 6 karakter"),

  body("username")
    .trim()
    .optional()
    .custom(async (username) => {
      const user = await User.findOne({ where: { username } });
      if (user != null) {
        throw new Error("Username sudah ada, silahkan isi yang lain");
      }
      return true;
    }),

  body("email")
    .optional()
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
    .notEmpty()
    .withMessage("Role wajib diisi")
    .bail()
    .isIn(["admin", "user", "kabagppa", "kabagumum"])
    .withMessage("Role tidak valid"),
];

const removeMeValidator = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password wajib diisi")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
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

const upgradeUserValidator = [
  body("nama")
    .trim()
    .optional()
    .isLength({ max: 50 })
    .withMessage("Nama maksimal 50 karakter"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username wajib diisi")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Nama maksimal 50 karakter")
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
    .optional()
    .isEmail()
    .withMessage("Format email tidak valid")
    .bail()
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error("Email sudah terdaftar");
      }
      return true;
    }),
];

module.exports = {
  createValidator,
  idParamsValidator,
  updateUserValidator,
  queryValidator,
  removeMeValidator,
  upgradeUserValidator,
};
