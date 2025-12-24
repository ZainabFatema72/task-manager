const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createTask,
  getUserTasks,
  updateStatus
} = require("../controllers/taskController");

router.post("/", auth, role("admin"), createTask);
router.get("/", auth, getUserTasks);
router.put("/:id", auth, updateStatus);

module.exports = router;


