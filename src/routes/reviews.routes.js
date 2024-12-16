const router = require("express").Router();

const { reviews_all, reviews_id, create, reviews_last, reviews_likes } = require("../controllers/reviews.js");

router.get("/:id", reviews_all);
router.get("/review/:id", reviews_id);
router.post("/:id", create);
router.get("/last/:id", reviews_last);
router.put("/likes", reviews_likes);

module.exports = router;