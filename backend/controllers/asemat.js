const router = require("express").Router();
const { Sequelize, Op } = require("sequelize");
const Asemat = require("../models/Asemat");

const getPaginatedData = async (page, limit, order, search) => {
  const offset = (page - 1) * limit;

  const searchCondition = search
    ? {
        [Op.or]: [
          { nimi: { [Op.iLike]: `%${search}%` } },
          { namn: { [Op.iLike]: `%${search}%` } },
          { osoite: { [Op.iLike]: `%${search}%` } },
          { adress: { [Op.iLike]: `%${search}%` } },
          { kaupunki: { [Op.iLike]: `%${search}%` } },
          { stad: { [Op.iLike]: `%${search}%` } },
          { operaattor: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  try {
    const { rows, count } = await Asemat.findAndCountAll({
      limit,
      offset,
      order: [[order, "ASC"]],
      where: searchCondition,
    });

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
    const search = req.query.search ? req.query.search.replace(/\s/g, "") : "";

    const paginatedData = await getPaginatedData(page, limit, order, search);
    res.status(200).json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const asema = await Asemat.findOne({ where: { id: req.params.id } });
    res.status(200).json(asema);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
