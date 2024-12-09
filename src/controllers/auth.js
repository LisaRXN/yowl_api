const db = require("../database.js");
const error_server = require("../utils/error.js");

function login(req, res) {
  const { email, password } = req.body;
  const params = [email, password];
  const secretKey = "shhhhhhared-secret";

  const stm = "SELECT * FROM users WHERE email = ?";

  db.connection.query(stm, params, (error, results) => {
    error_server(error);

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

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

module.exports = login;
