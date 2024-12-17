const router = require("express").Router();

const {login, register, send_token, verify_token, reset_password} = require("../controllers/auth.js");

router.post("/register", register)
router.post("/login", login)
router.post("/sendtoken", send_token)
router.post("/verifytoken", verify_token)
router.post("/resetpassword", reset_password)

module.exports = router;



