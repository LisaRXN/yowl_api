const request = require("../utils/request.js");

function create(req,res){
    const {user_id, review_id} = req.body
    const params = [user_id, review_id]
    const stm = "INSERT INTO likes (user_id, review_id, is_liked) VALUES (?, ?, true)"
    request(stm, params, res); 
}

// const stm = "INSERT INTO reviews (rating, title, content, business_id, user_id, createdAt) VALUES (?, ?, ?, ?, ?, ?)";


function get_reviews_liked(req, res) {

  const stm = "SELECT * FROM likes WHERE is_liked = true"; 
  const params = null;
  request(stm, params, res); 
}



module.exports = {reviews_liked, get_reviews_liked}

// SELECT * FROM likes WHERE is_liked = true    

//user_id review_id 