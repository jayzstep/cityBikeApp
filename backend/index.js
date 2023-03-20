require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')
const Matkat = require ('./models/matkat')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL)

app.get('/api/matkat', async (req, res) => {
  const matkat = await Matkat.findAll()
  res.json(matkat)
})

const PORT= process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})