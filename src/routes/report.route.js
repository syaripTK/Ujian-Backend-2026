const express = require("express");
const validate = require("../shared/middlewares/errors/validate.js");
const {
  detailUserById,
  detailCutiByStatus,
  getByIdApprover,
} = require("../modules/report/report.controller.js");
const verifyToken = require("../shared/middlewares/auth.middleware.js");
const { idParamsValidator } = require("../modules/cuti/cuti.validator.js");
const {
  paramStatusValidator,
} = require("../modules/report/report.validator.js");

const router = express.Router();
router.get(
  "/user-cuti/:id",
  verifyToken(["admin", "kabagumum", "kabagppa"]),
  idParamsValidator,
  validate,
  detailUserById,
);
router.get(
  "/user-cuti/status/:st",
  verifyToken(["admin", "kabagumum", "kabagppa"]),
  paramStatusValidator,
  validate,
  detailCutiByStatus,
);
router.get("/user-approve/:id", getByIdApprover);

module.exports = router;
