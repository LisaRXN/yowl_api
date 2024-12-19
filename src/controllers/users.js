const request = require("../utils/request.js");

// function create(req,res){
//     const {user_id, review_id} = req.body
//     const params = [user_id, review_id]
//     const stm = "INSERT INTO likes (user_id, review_id, is_liked) VALUES (?, ?, true)"
//     request(stm, params, res); 
// }


// function get_reviews_liked(req, res) {
//   const stm = "SELECT * FROM likes WHERE is_liked = true"; 
//   const params = null;
//   request(stm, params, res); 
// }

function user_id(req, res) {
  const id = req.params.id
  const stm = "SELECT * FROM users WHERE id = ?"; 
  const params = [id];
  request(stm, params, res); 
}


function user_reviews(req, res) {
  const id = req.params.id
  const stm =
  `SELECT users.*, reviews.*, COUNT(reviews.id) AS reviews_number
FROM reviews
INNER JOIN users ON users.id = reviews.user_id
WHERE users.id = ?
GROUP BY reviews.id;`
  const params = [id];
  request(stm, params, res); 
}


function update(req,res){
  const {firstname, lastname, email, country, avatar, id} = req.body
  const params = [];
  let stm = "UPDATE users SET ";

  if (firstname) {
    stm += "firstname = ?, ";
    params.push(firstname);
  }
  if (lastname) {
    stm += "lastname = ?, ";
    params.push(lastname);
  }
  if (email) {
    stm += "email = ?, ";
    params.push(email);
  }
  if (country) {
    stm += "country = ?, ";
    params.push(country);
  }
  if (avatar) {
    stm += "avatar = ?, ";
    params.push(avatar);
  }

  console.log(stm)
  stm = stm.slice(0, -2) + "WHERE id = ?";
  params.push(id);

  request(stm, params, res); 

}

module.exports = {update, user_id, user_reviews}

