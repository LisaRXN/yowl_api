const db = require("../database.js");
const error_server = require("../utils/error.js");
const request = require("../utils/request.js");


function reviews_all(req, res){
    const stm = "SELECT reviews.id review_id, reviews.*, users.* FROM reviews JOIN users ON reviews.user_id = users.id WHERE business_id = ?";
    const params = [req.params.id]
    request(stm, params, res); 
}

function reviews_id(req, res){
    const stm = "SELECT * FROM reviews WHERE id = ?";
    const params = [req.params.id]
    request(stm, params, res); 
}

function review_delete(req,res){
  const stm = "DELETE FROM reviews WHERE id = ?";
  const params = [req.params.id]
  request(stm, params, res); 
}

function create(req, res) {
    const business_id = req.params.id;
    const { rating, title, content, user_id } = req.body;
    const createdAt = new Date();
  
    //check user reviews
    const stm_check_user = "SELECT * FROM reviews WHERE user_id = ? AND business_id = ?";
    const params_user = [user_id, business_id]
    
    db.connection.query(stm_check_user, params_user , (error, results) => {
    error_server(error);
      if (results.length > 0) {
        return res.status(400).json({error: "You have already reviewed this business." });
      }
  
    //create new request 
      const stm = "INSERT INTO reviews (rating, title, content, business_id, user_id, createdAt) VALUES (?, ?, ?, ?, ?, ?)";
      const params = [rating, title, content, business_id, user_id, createdAt];
      db.connection.query(stm, params, (error, results) => {
         error_server(error);
          res.json({
            message: "Review created successfully!",
            reviewId: results.insertId,
          });
        }
      );
    });
  }




function reviews_last(req, res){
    const stm =
    "SELECT * FROM reviews JOIN users ON reviews.user_id = users.id WHERE business_id = ? ORDER BY reviews.createdAt DESC LIMIT 4";
    const params = [req.params.id]
    request(stm, params, res); 
}

function reviews_likes(req,res){
  const {likes, dislikes, id} = req.body
  const params = [likes, dislikes, id]
  const stm =
  "UPDATE reviews SET likes = ?, dislikes = ? WHERE id = ?";
  request(stm, params, res); 

}
 


  

module.exports = {reviews_all, reviews_id, create, reviews_last, reviews_likes, review_delete}
