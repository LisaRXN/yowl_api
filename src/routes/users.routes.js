const router = require("express").Router();

const {update, user_id, user_reviews} = require("../controllers/users.js");


router.put("/update", update)
router.get("/:id", user_id)
router.get("/reviews/:id", user_reviews)

module.exports = router;



