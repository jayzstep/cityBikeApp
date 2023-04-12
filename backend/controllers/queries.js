const router = require("express").Router();
const { Sequelize, Op } = require("sequelize");
const Matkat = require("../models/Matkat");
const Asemat = require("../models/Asemat");

router.get("/trips_begun", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    console.log("Station ID:", id);
    const tripsBegun = await Matkat.findAll({
      attributes: [
        "departure_station_name",
        [
          Sequelize.fn("COUNT", Sequelize.col("departure_station_name")),
          "trips_begun",
        ],
      ],
      group: ["departure_station_name"],
      where: {
        departure_station_id: id,
      },
    });
    res.json(tripsBegun);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the data.");
  }
});

router.get("/trips_ended", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const tripsEnded = await Matkat.findAll({
      attributes: [
        "return_station_name",
        [
          Sequelize.fn("COUNT", Sequelize.col("return_station_name")),
          "trips_ended",
        ],
      ],
      group: ["return_station_name"],
      where: {
        return_station_id: id,
      },
    });
    res.json(tripsEnded);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the data.");
  }
});

router.get("/average_trip_duration", async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const averageTripDuration = await Matkat.findAll({
      attributes: [
        "departure_station_name",
        [
          Sequelize.fn(
            "ROUND",
            Sequelize.fn("AVG", Sequelize.col("duration_s"))
          ),
          "average_trip_duration",
        ],
      ],
      group: ["departure_station_name"],
      where: {
        departure_station_id: id,
      },
    });

    res.json(averageTripDuration);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the data.");
  }
});

module.exports = router;
