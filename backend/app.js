require("dotenv").config();
const { Sequelize } = require("sequelize");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const asematRouter = require("./controllers/asemat");
const matkatRouter = require("./controllers/matkat");
const queriesRouter = require("./controllers/queries");

app.use(express.static(path.join(__dirname, "build")));

app.use(cors());

app.use("/api/asemat", asematRouter);

app.use("/api/matkat", matkatRouter);

app.use("/api/queries", queriesRouter);

// app.get("*", (req, res) => {
//   if (!req.path.startsWith("/api")) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   }
// });

module.exports = app;
