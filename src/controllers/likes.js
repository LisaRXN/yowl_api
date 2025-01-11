const request = require("../utils/request.js");

function get_likes_user_review(req, res) {
  const { user_id, review_id } = req.params;
  const params = [user_id, review_id];
  const stm_likes = "SELECT * FROM likes WHERE user_id = ? AND review_id = ?";
  request(stm_likes, params, res);
}

function create(req, res) {
  const { user_id, review_id, is_liked } = req.body;
  const params = [user_id, review_id, is_liked];
  const stm_likes ="INSERT INTO likes (user_id, review_id, is_liked, is_disliked) VALUES (?, ?, ?)";
  request(stm_likes, params, res);
}


function update(req, res) {
  const { user_id, review_id, is_liked, is_disliked } = req.body;
  const params = [is_liked, is_disliked, user_id, review_id];
  const stm =
    "UPDATE likes SET is_liked = ?, is_disliked = ? WHERE user_id = ? AND review_id = ?";
  request(stm, params, res);
}

function get_likes_user(req, res) {
  const { user_id, review_id } = req.params;
  const params = [user_id, review_id];
  const stm =
    "SELECT likes.is_liked, likes.is_disliked, likes.comment FROM likes INNER JOIN users ON likes.user_id = users.id WHERE likes.user_id = ? AND likes.review_id = ? ";
  request(stm, params, res);
}

function get_likes_review(req, res) {
  const params = [req.params.id];
  const stm =
    "SELECT COUNT(*) AS likes_count FROM likes WHERE review_id = ? AND is_liked = 1  ";
  request(stm, params, res);
}

function get_comments_review(req, res) {
  const params = [req.params.id];
  const stm =
    "SELECT likes.comment, users.*, users.id AS user_id FROM likes INNER JOIN users ON likes.user_id = users.id WHERE review_id = ? AND comment IS NOT null";
  request(stm, params, res);
}

function get_dislikes_review(req, res) {
  const params = [req.params.id];
  const stm =
    "SELECT COUNT(*) AS dislikes_count FROM likes WHERE review_id = ? AND is_disliked = 1  ";
  request(stm, params, res);
}

module.exports = {
  create,
  update,
  get_likes_user,
  get_likes_review,
  get_dislikes_review,
  get_likes_user_review,
  get_comments_review,
};
