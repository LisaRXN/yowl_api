const router = require("express").Router();

const { business_all, business_id, business_rating,business_category,create } = require("../controllers/business.js");



router.post("/", create);
router.get("/", business_all);
router.get("/:id", business_id)
router.get("/rating/:id", business_rating)
router.get("/category/:id", business_category)

module.exports = router;
