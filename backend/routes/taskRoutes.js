const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");
const { verifyAccessToken } = require("../middlewares.js");

router.get("/", verifyAccessToken, taskController.getTasks);
router.get("/:taskId", verifyAccessToken, taskController.getTask);
router.get("/Shared", verifyAccessToken, taskController.getSharedTasks);
router.post("/", verifyAccessToken, taskController.createTask);
router.put("/:taskId", verifyAccessToken, taskController.updateTask);
router.delete("/:taskId", verifyAccessToken, taskController.deleteTask);
router.patch('/:taskId/share', verifyAccessToken, taskController.shareTask);
module.exports = router;
