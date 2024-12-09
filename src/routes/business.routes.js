const router = require("express").Router();

const { business_all, business_id, business_rating } = require("../controllers/business.js");


router.get("/", business_all);
router.get("/:id", business_id)
router.get("/rating/:id", business_rating)

module.exports = router;
