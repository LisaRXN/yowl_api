const router = require("express").Router();

const {
  create,
  update,
  get_likes_user,
  get_likes_review,
  get_dislikes_review,
  get_likes_user_review,
} = require("../controllers/likes.js");

router.post("/create", create);
router.post("/update", update);

router.get("/get_likes_user/:user_id/:review_id", get_likes_user);
router.get("/get_likes_review/:id", get_likes_review);
router.get("/get_dislikes_review/:id", get_dislikes_review);
router.get("/get_likes_user_review/:user_id/:review_id", get_likes_user_review);

module.exports = router;
