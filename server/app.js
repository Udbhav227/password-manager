const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const passRoutes = require("./routes/passRoutes");
require("dotenv").config();

const app = express();

// middlewares
app.use(
  cors({
    origin: "https://password-manager-ten-umber.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());

// use routes
app.use("/api", authRoutes);
app.use("/api/passwords", passRoutes);

// http requests
app.get("/", (req, res) => {
  res.send("backend api is running!");
});

module.exports = app;
