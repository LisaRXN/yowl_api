const router = require("express").Router();

const {get_comments_review, get_comment_user_review, create} = require("../controllers/comments.js");


router.get("/get_comments_review/:review_id", get_comments_review);
router.get("/get_comment_user_review/:user_id/:review_id", get_comment_user_review);
router.post("/create", create);


module.exports = router;
