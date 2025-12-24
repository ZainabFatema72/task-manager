const Task = require("../models/Task");
const User = require("../models/User");

exports.createTask = async (req, res) => {
  try {
    const { title, priority, assignedTo } = req.body;
    const user = await User.findById(assignedTo);
    if (!user) return res.status(404).json("User not found");

    const task = await Task.create({ title, priority, assignedTo: user._id });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json("Task not found");

    task.status = req.body.status || task.status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
