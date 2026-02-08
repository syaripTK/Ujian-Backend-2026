const express = require("express");
const {
  upgradeKaryawan,
  createKaryawan,
  spillKaryawan,
  karyawanResign,
} = require("../modules/karyawan/karyawan.controller");
const {
  createKaryawanValidator,
  idParamsValidator,
  upgradeValidator,
} = require("../modules/karyawan/karyawan.validator");
const validate = require("../shared/middlewares/validate");
const verifyToken = require("../shared/middlewares/auth.middleware");

const router = express.Router();
router.post(
  "/create",
  verifyToken(["admin"]),
  createKaryawanValidator,
  validate,
  createKaryawan,
);
router.get("/lookup", verifyToken("[admin"), spillKaryawan);
router.delete(
  "/remove/:id",
  verifyToken(["admin"]),
  idParamsValidator,
  validate,
  karyawanResign,
);
router.patch(
  "/update/:id",
  verifyToken(["admin"]),
  idParamsValidator,
  upgradeValidator,
  validate,
  upgradeKaryawan,
);
module.exports = router;
