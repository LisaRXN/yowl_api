const fs = require("fs");
const {Buffer} = require('buffer');
const path = require("path");
const db = require("../database.js");
const error_server = require("../utils/error.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const request = require("../utils/request.js");
require("dotenv").config();


function register(req, res) {
  const { firstname, lastname, email, password, country, role, avatar } = req.body;
  console.log('Request body:', req.body); 
  try {
    const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");

    const filename = `${Date.now()}_${firstname}_${lastname}.jpg`;
    const filePath = path.join("public/images", filename);

    fs.writeFile(filePath, imageBuffer, (err) => {
      if (err) {
        console.error('Error saving image:', err);
        return res.status(500).send("Error saving image");
      }

      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).send("Error hashing password");
        }

        const avatarName = `/images/${filename}`
        const stm =
          "INSERT INTO users (firstname, lastname, email, password, country, role, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const params = [firstname, lastname, email, hash, country, role, avatarName];
        request(stm, params, res);
      });
      
    });
  } catch (error) {
    console.error('Error in register function:', error);
    return res.status(500).send("Server error");
  }
}






function login(req, res) {
  const { email, password } = req.body;
  const params = [email, password];
  const secretKey = process.env.JWT_SECRET;

  const stm = "SELECT * FROM users WHERE email = ?";

  db.connection.query(stm, params, (error, results) => {
    error_server(error);

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = results[0];

    bcrypt.compare(password, user.password, (error, result) => {
      error_server(error);

      if (!result) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        secretKey,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        token: token,
        user: results[0],
      });
    });
  });
}

// function login(req, res){

//     const stm = "SELECT * FROM users WHERE email = ? AND password = ?";
//     const { email, password } = req.body;
//     const params = [ email, password ]

//     db.connection.query(stm, params, (error, results) => {
//         error_server(error);
//         if (results.length === 0) {
//           res.status(401).json({ message: "Invalid email or password" });
//           return;
//         }
//         const user = results[0];
//         res.status(200).json({ user });
//       });

// }

module.exports = { login, register };
