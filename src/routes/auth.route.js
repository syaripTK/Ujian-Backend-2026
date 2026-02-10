const express = require("express");
const {
  register,
  login,
  changePassword,
  changeUsername,
} = require("../modules/auth/auth.controller.js");
const {
  registerValidator,
  loginValidator,
  changeValidator,
  changeUsnValidator,
} = require("../modules/auth/auth.validator.js");
const validate = require("../shared/middlewares/errors/validate.js");
const verifyToken = require("../shared/middlewares/auth.middleware.js");
const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.patch(
  "/change-password",
  verifyToken(["user", "kabagppa", "kabagumum", "admin"]),
  changeValidator,
  validate,
  changePassword,
);
router.patch(
  "/change-username",
  verifyToken(["user", "kabagppa", "kabagumum"]),
  changeUsnValidator,
  validate,
  changeUsername,
);
module.exports = router;
