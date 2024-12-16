const router = require("express").Router();

const { search_all, search_by } = require("../controllers/search.js");


router.get("/:search", search_all)
router.get("/:search/:param", search_by)

module.exports = router;
