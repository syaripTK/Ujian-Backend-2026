const express = require("express");
const {
  register,
  login,
  changePassword,
} = require("../modules/auth/auth.controller.js");
const {
  registerValidator,
  loginValidator,
  changeValidator,
} = require("../modules/auth/auth.validator.js");
const validate = require("../shared/middlewares/validate.js");
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
module.exports = router;
