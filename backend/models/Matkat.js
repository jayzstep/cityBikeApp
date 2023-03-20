require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)

class Matkat extends Model { }

Matkat.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  departure: {
    type: DataTypes.DATE
  },
  return: {
    type: DataTypes.DATE
  },
  departure_station_id: {
    type: DataTypes.TEXT
  },
  return_station_id: {
    type: DataTypes.TEXT
  },
  covered_distance_m: {
    type: DataTypes.REAL
  },
  duration_s: {
    type: DataTypes.INTEGER
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  freezeTableName: true,
  modelName: 'matkat'
})

module.exports = Matkat