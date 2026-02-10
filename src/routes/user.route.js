const express = require("express");
const verifyToken = require("../shared/middlewares/auth.middleware.js");
const {
  createUser,
  seeAllUser,
  removeUser,
  updateUser,
  searchUser,
  searchName,
} = require("../modules/user/user.controller.js");
const {
  createValidator,
  idParamsValidator,
  updateUserValidator,
  queryValidator,
} = require("../modules/user/user.validator.js");
const validate = require("../shared/middlewares/errors/validate.js");
const uploadPhoto = require("../shared/middlewares/upload.middlware.js");
const router = express.Router();

router.post(
  "/create",
  verifyToken(["admin"]),
  uploadPhoto("profil"),
  createValidator,
  validate,
  createUser,
);
router.get(
  "/lookup",
  verifyToken(["admin", "kabagppa", "kabagumum"]),
  seeAllUser,
);
router.delete(
  "/remove/:id",
  verifyToken(["admin"]),
  idParamsValidator,
  validate,
  removeUser,
);
router.patch(
  "/update/:id",
  verifyToken(["admin"]),
  uploadPhoto("profil"),
  updateUserValidator,
  validate,
  updateUser,
);
router.get(
  "/search/:id",
  verifyToken(["admin"]),
  idParamsValidator,
  validate,
  searchUser,
);
router.get(
  "/find",
  verifyToken(["admin"]),
  queryValidator,
  validate,
  searchName,
);

module.exports = router;
