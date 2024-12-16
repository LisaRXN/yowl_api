const router = require("express").Router();

const authenticateJWT = require("../middlewares/auth.middleware.js");
// Routes
const authRoutes = require("./auth.routes.js");
const businessRoutes = require("./business.routes.js");
const reviewsRoutes = require("./reviews.routes.js");
const searchRoutes = require("./search.routes.js");
const likesRoutes = require("./likes.routes.js");
const commentsRoutes = require("./comments.routes.js");
const categoriesRoutes = require("./categories.routes.js");
const passportRoutes = require("./passport.routes.js");

//const usersRoutes = require("./users.routes.js");

router.use("/auth", authRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/search", searchRoutes);
router.use("/business", businessRoutes);
router.use("/likes", likesRoutes);
router.use("/comments", commentsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/passport", passportRoutes);
//router.use("/users", usersRoutes);

module.exports = router;
