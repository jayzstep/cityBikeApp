require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const Matkat = require("./models/matkat");
const Asemat = require("./models/asemat");
const express = require("express");
const cors = require("cors");
const app = express();

const asematRouter = require("./controllers/asemat");
const matkatRouter = require("./controllers/matkat");

const sequelize = new Sequelize(process.env.DATABASE_URL);

app.use(cors());

app.use("/api/asemat", asematRouter);

app.use("/api/matkat", matkatRouter);

module.exports = app;
