require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const Matkat = require("./models/matkat");
const Asemat = require("./models/asemat");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL);

app.get("/api/matkat", async (req, res) => {
  const matkat = await Matkat.findAll();
  res.json(matkat);
});

app.get("/api/asemat", async (req, res) => {
  const asemat = await Asemat.findAll();
  res.json(asemat);
});

module.exports = app;
