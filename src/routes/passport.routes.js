const router = require("express").Router();

const { googleAuth, googleAuthCallback, authSuccess, google_profile, google_delete } = require("../controllers/passport");


router.get("/auth/google", googleAuth); // Route pour démarrer l'authentification
router.get("/auth/google/callback", googleAuthCallback, authSuccess); // Route de callback après l'authentification
router.get("/auth/google/profile", google_profile); 
router.delete("/auth/google/:email", google_delete); 

module.exports = router;


