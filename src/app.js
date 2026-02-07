process.env.TZ = "Asia/Jakarta";
const express = require("express");
const sequelize = require("./config/sequelize.js");
const path = require("path");
const userRoute = require("./routes/user.route.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", userRoute);

module.exports = app;
