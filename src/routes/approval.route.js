const express = require("express");
const validate = require("../shared/middlewares/errors/validate.js");
const verifyToken = require("../shared/middlewares/auth.middleware.js");
const {
  cutiApprovement,
  updateApprovement,
  removeApproval,
} = require("../modules/approval/approval.controller.js");
const {
  approvementValidator,
  idParamsValidator,
} = require("../modules/approval/approval.validator.js");

const router = express.Router();
router.post(
  "/create",
  verifyToken(["admin", "kabagppa", "kabagumum"]),
  approvementValidator,
  validate,
  cutiApprovement,
);
router.patch(
  "/update/:id",
  verifyToken(["admin", "kabagppa", "kabagumum"]),
  idParamsValidator,
  approvementValidator,
  validate,
  updateApprovement,
);
router.delete(
  "/delete/:id",
  verifyToken(["admin", "kabagppa", "kabagumum"]),
  idParamsValidator,
  validate,
  removeApproval,
);
module.exports = router;
