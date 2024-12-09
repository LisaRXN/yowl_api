const router = require("express").Router();

const { search_all, search_by } = require("../controllers/search.js");


router.get("/mvp_api/search/:search", search_all)
router.get("/mvp_api/search/:search/:param", search_by)

module.exports = router;
