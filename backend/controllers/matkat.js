const router = require("express").Router();
const Matkat = require("../models/matkat");

const getPaginatedData = async (page, limit, order) => {
  const offset = (page - 1) * limit;

  try {
    const { rows, count } = await Matkat.findAndCountAll({
      limit,
      offset,
      order: [[order, "ASC"]],
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
    const paginatedData = await getPaginatedData(page, limit, order);
    res.status(200).json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
