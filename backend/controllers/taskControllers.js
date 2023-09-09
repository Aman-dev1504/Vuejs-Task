const Task = require("../models/Task");
const { validateObjectId } = require("../utils/validation");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      category: req.body.category,
      user: req.user.id,
    });

    res.status(201).json({ task});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
exports.getSharedTasks = async (req, res) => {
  try {
    const sharedTasks = await Task.find({ sharedWith: req.user.id });
    res.status(200).json({ sharedTasks, status: true, msg: "Tasks found successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
exports.getTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }
    res.status(200).json({ task, status: true, msg: "Task found successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;

    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't update a task of another user" });
    }

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.category = category;

    await task.save();

    res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.deleteTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't delete a task of another user" });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
exports.shareTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { sharedWith } = req.body;

    if (!validateObjectId(taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    const task = await Task.findOne({ user: req.user.id, _id: taskId });
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't share a task you didn't create" });
    }
    task.sharedWith.push(...sharedWith);
    await task.save();

    res.status(200).json({ task, status: true, msg: "Task shared successfully.." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
