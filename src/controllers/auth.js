const fs = require("fs");
const { Buffer } = require("buffer");
const path = require("path");
const db = require("../database.js");
const error_server = require("../utils/error.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const request = require("../utils/request.js");
require("dotenv").config();
const Mailjet = require("node-mailjet");

function register(req, res) {
  const { firstname, lastname, email, password, country, role, avatar } = req.body;
  console.log("Request body:", req.body);

  const stm_check = "SELECT * FROM users WHERE email = ?";
  const param_user = [email];
  db.connection.query(stm_check, param_user, (error, results) => {
    error_server(error);

    if (results.length === 0) {

      let avatarName;
        if (!avatar) {
        avatarName = "/images/avatar.png";
      } else {
        try {
          const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
          const imageBuffer = Buffer.from(base64Data, "base64");
          const filename = `${Date.now()}_${firstname}_${lastname}.jpg`;
          const filePath = path.join("public/images", filename);

          fs.writeFile(filePath, imageBuffer, (err) => {
            if (err) {
              console.error("Error saving image:", err);
              return res.status(500).send("Error saving image");
            }

            avatarName = `/images/${filename}`; // L'avatar est sauvegardé, on utilise son chemin
          });
        } catch (error) {
          console.error("Error in register function:", error);
          return res.status(500).send("Server error");
        }
      }

      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).send("Error hashing password");
        }

        const stm =
          "INSERT INTO users (firstname, lastname, email, password, country, role, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const params = [
          firstname,
          lastname,
          email,
          hash,
          country,
          role,
          avatarName,
        ];
        request(stm, params, res);
      });
    } else {
      return res.status(404).json({ error: "User already exists" });
    }
  });
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




function send_token(req, res) {

  const {email} = req.body;

  if (!email) {
    return res.status(400).json({ status: "Please send your email" });
  }

  // Générer un token signé
  const secretKey = process.env.JWT_SECRET
  const token = jwt.sign(
    { email }, 
    secretKey,
    { expiresIn: "1h" } )

    // const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    const resetLink = `http://localhost:5173/auth/reset-password?token=${token}`;


  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "lisa.eriksen@epitech.eu",
          Name: "Yowl",
        },
        To: [
          {
            Email: `${email}`,
            Name: "Yowl Member",
          },
        ],
        Subject: "Reset your password!",
        TextPart: "",
        HTMLPart: `
        <p>Seems like you forgot your password for your Yowl account. If this is true, click below to reset your password:</p>
        <br>
        <a href="${resetLink}">Reset Password</a>
        <p>If you did not forget your password, you can safely ignore this email.</p>
      `,
      },
    ],
  });

  request
    .then((result) => {
      console.log("Email sent:", result.body);
      res
        .status(200)
        .json({ message: "Email sent successfully!", details: result.body });
    })
    .catch((err) => {
      console.error("Error sending email:", err.statusCode, err.message);
      res
        .status(err.statusCode || 500)
        .json({ error: "Failed to send email.", details: err.message });
    });
}



function verify_token(req,res){

   const token = req.body.token; 
   const secretKey = process.env.JWT_SECRET

   if(token){ 
       const decode = jwt.verify(token, secretKey); 
       res.json({ 
           login: true, 
           results: decode 
       }); 
   }else{ 
       res.json({ 
           login: false, 
           results: 'error' 
       }); 
   }
}



function reset_password(req, res) {
  const { password, confirmPassword, email } = req.body;

  if (!password || !confirmPassword || !email) {
    return res.status(400).json({ status: "Invalid input" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ status: "Passwords do not match" });
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ status: "Error processing request" });
    }

    const params = [hash, email];
    const stm = "UPDATE users SET password = ? WHERE email = ?";
    db.connection.query(stm, params, (error, results) => {
      error_server(error);
      if (results.affectedRows === 0) {
        return res.status(404).json({ status: "Email not found" });
      }
      return res.status(200).json({ status: "Password reset successfully" });
    })

  });
}
  


module.exports = { login, register, verify_token, reset_password, send_token };
