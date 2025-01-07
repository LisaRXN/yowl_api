const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const session = require("express-session");
const indexRoutes = require("./routes/index.routes.js");
const passport = require("../src/controllers/passport-config.js");
require("dotenv").config();

//Cors
app.use(cors());
app.use(express.json({ limit: "10mb" }));


//Autorise l'accès dossier public (pour les images)
app.use(express.static("public"));

//GoogleAuth
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    sameSite: 'none'
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.send("Hello Yowl Api!");
});


app.listen(port, () => {
  console.log(`Yowl api listening on port ${port}`);
});

// Init Routes
app.use("/api", indexRoutes);
