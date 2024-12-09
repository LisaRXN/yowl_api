const request = require("../utils/request.js");

function search_all(req, res) {
  const stm = "SELECT * FROM business WHERE name LIKE ? OR CATEGORY LIKE ?";
  const name = "%" + req.params.search + "%";
  const category = "%" + req.params.search + "%";
  const params = [name, category];

  request(stm, params, res);
}


function search_by(req, res) {
  const { param } = req.params;
  let stm;
  const name = "%" + req.params.search + "%";
  const category = "%" + req.params.search + "%";
  const params = [name, category]

  if (param == "notation") {
    stm =
      "SELECT * FROM business WHERE name LIKE ? OR CATEGORY LIKE ? ORDER BY notation DESC";
  }
  if (param == "reviews") {
    stm =
      "SELECT * FROM business WHERE name LIKE ? OR CATEGORY LIKE ? ORDER BY reviews_number DESC";
  }
  if (param == "last") {
    stm =
      "SELECT DISTINCT business.*, reviews.createdAt as last FROM business JOIN reviews ON business.id = reviews.business_id WHERE business.name LIKE ? OR business.category LIKE ? ORDER BY last DESC ";
  }

  request(stm, params, res);

}

module.exports = { search_all, search_by};
