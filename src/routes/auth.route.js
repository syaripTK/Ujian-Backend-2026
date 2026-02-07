const express = require("express");
const { register, login, createUser } = require("../modules/user/user.controller.js");
const {
  registerValidator,
  loginValidator,
} = require("../modules/user/user.validator.js");
const validate = require("../shared/middlewares/validate.js");
const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
module.exports = router;
