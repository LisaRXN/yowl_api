const router = require("express").Router();


// Routes
const authRoutes = require("./auth.routes.js");
const businessRoutes = require("./business.routes.js");
const reviewsRoutes = require("./reviews.routes.js");
const searchRoutes = require("./search.routes.js");
//const usersRoutes = require("./users.routes.js");

router.use("/auth", authRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/search", searchRoutes);
router.use("/business", businessRoutes);
//router.use("/users", usersRoutes);


module.exports = router;