const passport = require("passport");
require('dotenv').config(); 
const jwt = require("jsonwebtoken");
const request = require("../utils/request.js");


const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });   


const googleAuthCallback = passport.authenticate('google', { failureRedirect: '/' },);   


const authSuccess = (req, res) => {                                                     
       res.redirect("http://localhost:5173/auth/callback");
};


const google_profile = (req, res) => {
    const stm = "SELECT * FROM google_users ORDER BY id DESC LIMIT 1";
    request(stm, null, res); 
}

const google_delete = (req, res) => {
    const email = req.params.email
    const params = [email]
    const stm = "DELETE FROM google_users WHERE email = ?";
    request(stm, params, res); 
}

module.exports = {
    googleAuth,
    googleAuthCallback,
    authSuccess,
    google_profile,
    google_delete
};