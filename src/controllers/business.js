const request = require("../utils/request.js");

function business_all(req, res) {
  const stm = "SELECT * FROM business"; 
  const params = null;
  request(stm, params, res); 
}

function business_id(req,res){
  const stm = "SELECT * FROM business WHERE id = ?";
  const id = req.params.id;
  const params= [id]
  request(stm, params, res); 
}

function business_rating(req, res){
  const stm = "SELECT ROUND(AVG(rating),1) as rating,  COUNT(*) as reviews_number FROM reviews WHERE business_id = ?";
  const params = [req.params.id];
  request(stm, params, res); 

}


module.exports = {business_all, business_id, business_rating}
