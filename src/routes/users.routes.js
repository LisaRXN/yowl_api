const router = require("express").Router();

const {update, user_id, user_reviews, user_email} = require("../controllers/users.js");


router.put("/update", update)
router.get("/:id", user_id)
router.get("/reviews/:id", user_reviews)
router.put("/find", user_email)

module.exports = router;



