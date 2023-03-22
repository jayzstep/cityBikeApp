const express = require("express");
const router = require("express").Router();

const Asemat = require("../models/asemat");

const getPaginatedData = async (page, limit) => {
  const offset = (page - 1) * limit;

  try {
    const { rows, count } = await Asemat.findAndCountAll({
      limit,
      offset,
      order: [["id", "DESC"]],
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

// ! tsekkaa polku
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const paginatedData = await getPaginatedData(page, limit);
    res.status(200).json(paginatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
