const express = require("express");
const router = express.Router();
const {
getAllUsers,
getUserById,
deleteUser,
updateUser,
} = require("../controllers/profileControllers");
const { verifyAccessToken } = require("../middlewares.js");

router.get("/users", verifyAccessToken, getAllUsers);
router.get("/users/:userId", verifyAccessToken, getUserById);
router.delete("/users/:userId", verifyAccessToken, deleteUser);
router.put("/users/:userId", verifyAccessToken, updateUser);

module.exports = router;