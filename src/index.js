const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const session = require("express-session");
const indexRoutes = require("./routes/index.routes.js");
const passport = require('../src/controllers/passport-config.js')
require('dotenv').config(); 


//Autorise l'accès' dossier public (pour les images)
app.use(express.static('public'));

//GoogleAuth
app.use(session({
  secret: 'secret',  
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

//middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use(session({
    secret: 'ton_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // En mode développement, secure: false (mettre true pour HTTPS)
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Init Routes
app.use("/api", indexRoutes);
