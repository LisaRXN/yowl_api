const passport = require('passport');
const db = require("../database.js");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config(); 

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET";
// const CALLBACK_URL = process.env.CALLBACK_URL || "CALLBACK_URL";

console.log('GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID);  
console.log('GOOGLE_CLIENT_SECRET:', GOOGLE_CLIENT_SECRET);



passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/passport/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
    
    const user = {
        id: profile.id,
        displayName: profile.displayName,
        emails: profile.emails,
        token: accessToken  
      };    
      
    console.log(profile);
    const stm = "INSERT into google_users (name, email, token) VALUES (?,?,?)";
    const params= [profile.displayName, profile.emails[0].value, accessToken]
    db.connection.query(stm, params) 
    done(null, user);

}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user))

module.exports = passport