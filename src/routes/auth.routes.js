const router = require("express").Router();

const login = require("../controllers/auth.js");

router.post("/login", login)

module.exports = router;
