process.env.TZ = "Asia/Jakarta";
const express = require("express");
const sequelize = require("./config/sequelize.js");
const path = require("path");
const authRoute = require("./routes/auth.route.js");
const userRoute = require("./routes/user.route.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoute);
app.use("/api/masterdata/user", userRoute);

module.exports = app;
