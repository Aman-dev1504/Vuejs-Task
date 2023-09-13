const User = require("../models/User");
const bcrypt = require('bcrypt');
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('_id name'); 
    res.status(200).json({ users, status: true, msg: "Users found successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }

    res.status(200).json({ user, status: true, msg: "User found successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ status: true, msg: "User deleted successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, password } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    user.name = name;
    user.email = email;
    user.password = hashedPassword; 

    await user.save();

    res.status(200).json({ user, status: true, msg: "User updated successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}




