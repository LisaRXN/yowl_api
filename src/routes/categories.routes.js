const router = require("express").Router();

const { categories_all } = require("../controllers/categories.js");


router.get("/", categories_all);

module.exports = router;
