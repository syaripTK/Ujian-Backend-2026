const express = require("express");
const {
  addCuti,
  updateCuti,
  removeCuti,
  sisaCuti,
  lookMyCuti,
} = require("../modules/cuti/cuti.controller");
const {
  cutiValidator,
  idParamsValidator,
} = require("../modules/cuti/cuti.validator");
const validate = require("../shared/middlewares/errors/validate.js");
const verifyToken = require("../shared/middlewares/auth.middleware.js");

const router = express.Router();
router.post(
  "/create",
  verifyToken(["user", "admin"]),
  cutiValidator,
  validate,
  addCuti,
);
router.patch(
  "/update/:id",
  verifyToken(["user", "admin"]),
  idParamsValidator,
  cutiValidator,
  validate,
  updateCuti,
);
router.delete(
  "/delete/:id",
  verifyToken(["user", "admin"]),
  idParamsValidator,
  validate,
  removeCuti,
);
router.get("/my-cuti", verifyToken(["user"]), lookMyCuti);
router.get("/sisa-cuti", verifyToken(["user", "admin"]), sisaCuti);
module.exports = router;
