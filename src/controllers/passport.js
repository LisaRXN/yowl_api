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
    
        // if (req.isAuthenticated()) {
        //   // Si l'utilisateur est authentifié, renvoyer ses données
        //   return res.json({
        //     success: true,
        //     user: req.user,
        //   });
        // } else {
        //   // Redirection vers Register si non authentifié
        //   return res.json({
        //     success: false
        //     // redirect: '/register',
        //   });
        // }
}


module.exports = {
    googleAuth,
    googleAuthCallback,
    authSuccess,
    google_profile,
};