const router = require("express").Router();
const { Sequelize, Op } = require("sequelize");
const Matkat = require("../models/Matkat");

const getPaginatedData = async (page, limit, order, search) => {
  const offset = (page - 1) * limit;

  const searchCondition = search
    ? {
        [Op.or]: [
          { departure_station_name: { [Op.iLike]: `%${search}%` } },
          { return_station_name: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  try {
    const { rows, count } = await Matkat.findAndCountAll({
      limit,
      offset,
      order: [[order, "ASC"]],
      where: searchCondition,
      // attributes: [
      //   "departure_station_name",
      //   "return_station_name",
      //   "covered_distance_m",
      //   "duration_s",
      // ],
    });

    // const data = rows.map((row) => {
    //   row.get({ plain: true });
    // });

    return {
      data: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCount: count,
    };
  } catch (error) {
    throw error;
  }
};

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = req.query.order || "id";
    const search = req.query.search.replace(/\s/g, "") || "";
    const paginatedData = await getPaginatedData(page, limit, order, search);
    res.status(200).json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
