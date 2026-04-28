const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const passRoutes = require("./routes/passRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// use routes
app.use("/api", authRoutes);
app.use("/api/passwords", passRoutes);
app.use("/api/users", userRoutes);

// http requests
app.get("/", (req, res) => {
  res.send("backend api is running!");
});

module.exports = app;
