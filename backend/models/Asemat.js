const config = require("../utils/config");
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config.DATABASE_URL);

class Asemat extends Model {}

Asemat.init(
  {
    fid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: DataTypes.INTEGER,
    },
    nimi: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.TEXT,
    },
    osoite: {
      type: DataTypes.TEXT,
    },
    adress: {
      type: DataTypes.TEXT,
    },
    kaupunki: {
      type: DataTypes.TEXT,
    },
    stad: {
      type: DataTypes.TEXT,
    },
    operaattor: {
      type: DataTypes.TEXT,
    },
    kapasiteet: {
      type: DataTypes.INTEGER,
    },
    x: {
      type: DataTypes.DOUBLE,
    },
    y: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    modelName: "asemat",
  }
);

module.exports = Asemat;
