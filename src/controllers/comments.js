const request = require("../utils/request");

function get_comments_review(req, res) {
    const params = [req.params.review_id];
    const stm =
      // "SELECT comments.comment, users.*, users.id AS user_id FROM comments INNER JOIN users ON comments.user_id = users.id WHERE review_id = ? AND comments.comment IS NOT null";
      "SELECT * FROM comments INNER JOIN users ON comments.user_id = users.id WHERE review_id = ? AND comments.comment IS NOT null";
    request(stm, params, res);
  }

  function create(req, res) {
    const { user_id, review_id, comment } = req.body;
    const params = [user_id, review_id, comment];
    const stm ="INSERT INTO comments (user_id, review_id, comment, createdAt) VALUES (?, ?, ?, NOW())";
    request(stm, params, res);
  }

  function get_comment_user_review(req, res) {
    const { user_id, review_id } = req.params;
    const params = [user_id, review_id];
    const stm =
      "SELECT comment FROM comments WHERE user_id = ? AND review_id = ? ";
    request(stm, params, res);
  }


  module.exports = {
    get_comments_review,
    create,
    get_comment_user_review
  };
  