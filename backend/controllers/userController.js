
import User from "../models/User.js";
import Task from "../models/Task.js";

export const getAllUsers = async (req, res) => {
  try {
    // 🔒 only admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find().select("-password");

    const usersWithTasks = [];

    for (let user of users) {
      const tasks = await Task.find({ assignedTo: user._id })
        .select("title status priority");

      usersWithTasks.push({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tasks,
      });
    }

    res.json(usersWithTasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
