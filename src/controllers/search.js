const request = require("../utils/request.js");

function search_all(req, res) {
  const stm =
    "SELECT business.*, categories.name as category FROM business INNER JOIN categories ON business.category_id = categories.id WHERE business.name LIKE ? OR categories.name LIKE ?";
  const name = "%" + req.params.search + "%";
  const category = "%" + req.params.search + "%";
  const params = [name, category];
  request(stm, params, res);
}

function search_by(req, res) {
  const { search, param } = req.params;
  let stm;
  const name = "%" + search + "%";
  const category = "%" + search + "%";
  const params = [name, category];

  if (param == "notation") {
    stm =
      `SELECT business.*, categories.name as category, ROUND(AVG(rating),1) as rating FROM business 
       INNER JOIN categories ON categories.id = business.category_id 
       LEFT JOIN reviews on reviews.business_id = business.id
       WHERE business.name LIKE ? OR categories.name LIKE ? 
       GROUP BY business.id
       ORDER BY rating DESC`;
  }
  if (param == "reviews") {
    stm = `SELECT  business.*, categories.name AS category, COUNT(reviews.id) AS review_count FROM business 
      INNER JOIN categories ON categories.id = business.category_id
      LEFT JOIN reviews ON reviews.business_id = business.id
      WHERE business.name LIKE ? OR categories.name LIKE ?
      GROUP BY business.id, categories.name
      ORDER BY review_count DESC;`;
  }
  if (param == "last") {
    stm =
      "SELECT DISTINCT business.*, reviews.createdAt as last FROM business INNER JOIN reviews ON business.id = reviews.business_id WHERE business.name LIKE ? OR business.category LIKE ? ORDER BY last DESC ";
  }
  try {
    request(stm, params, res);
  } catch (error) {
    console.error("Error executing request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while executing the query." });
  }
}

module.exports = { search_all, search_by };
