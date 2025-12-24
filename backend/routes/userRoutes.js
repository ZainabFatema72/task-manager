

const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getAllUsers } = require("../controllers/userController");

// Admin only
router.get("/", auth, role("admin"), getAllUsers);

module.exports = router;
