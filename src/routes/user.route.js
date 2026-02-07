const express = require("express");
const verifyToken = require("../shared/middlewares/auth.middleware.js");
const {
  createUser,
  seeAllUser,
  removeUser,
} = require("../modules/user/user.controller.js");
const { createValidator } = require("../modules/user/user.validator.js");
const upload = require("../shared/middlewares/upload.middleware.js");
const validate = require("../shared/middlewares/validate.js");
const router = express.Router();

router.post(
  "/create",
  verifyToken(["admin"]),
  upload.single("profil"),
  createValidator,
  validate,
  createUser,
);
router.get(
  "/lookup",
  verifyToken(["admin", "kabagppa", "kabagumum"]),
  seeAllUser,
);
router.delete("/remove/:id", verifyToken(["admin"]), removeUser);

module.exports = router;
