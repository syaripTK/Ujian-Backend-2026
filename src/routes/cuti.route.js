const express = require("express");
const {
  addCuti,
  updateCuti,
  removeCuti,
} = require("../modules/cuti/cuti.controller");
const {
  cutiValidator,
  idParamsValidator,
} = require("../modules/cuti/cuti.validator");
const validate = require("../shared/middlewares/validate.js");
const verifyToken = require("../shared/middlewares/auth.middleware.js");

const router = express.Router();
router.post("/create", verifyToken(["user"]), cutiValidator, validate, addCuti);
router.patch(
  "/update/:id",
  verifyToken(["user"]),
  idParamsValidator,
  cutiValidator,
  validate,
  updateCuti,
);
router.delete(
  "/delete/:id",
  verifyToken(["user"]),
  idParamsValidator,
  validate,
  removeCuti,
);
module.exports = router;
