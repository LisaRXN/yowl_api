const request = require("../utils/request.js");

function categories_all(req,res){
    const stm = "SELECT * FROM categories";
    const params=null
    request(stm, params, res); 
  }
  
  module.exports = {categories_all}
