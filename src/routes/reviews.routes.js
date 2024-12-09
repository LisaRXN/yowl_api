const router = require("express").Router();

const { reviews_all, create, reviews_last } = require("../controllers/reviews.js");

router.get("/mvp_api/reviews/:id", reviews_all);
router.post("/:id", create);
router.get("/:id", reviews_last);

module.exports = router;