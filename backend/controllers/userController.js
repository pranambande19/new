const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.jwt_secretkey);
  res.json({ token });
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // user ID from auth middleware
    const { name, gender, address, mobile } = req.body;
    console.log("Request body:", req.body);


    const user = await User.findById(userId);
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    user.name = name || user.name;
    user.gender = gender || user.gender;
    user.address = address || user.address;
    user.mobile = mobile || user.mobile;

    await user.save();
    const updatedUser = await User.findById(user._id).select("-password");
    res.status(200).json(updatedUser);

  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const storage = multer.memoryStorage(); // Store in RAM (not disk)
exports.upload = multer({ storage: storage }).single('profilePic');

exports.uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    await User.findByIdAndUpdate(req.user.id, {
      profilePic: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    const updatedUser = await User.findById(req.user.id).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error("Error uploading profile picture:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (user.profilePic && user.profilePic.data) {
      const base64Image = user.profilePic.data.toString('base64');
      const mimeType = user.profilePic.contentType;

      // Convert to base64 string
      const profilePicUrl = `data:${mimeType};base64,${base64Image}`;
      res.json({ ...user.toObject(), profilePic: profilePicUrl });
    } else {
      res.json({ ...user.toObject(), profilePic: null });
    }
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/users/profile/pic
exports.removeProfilePic = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $unset: { profilePic: "" } },
      { new: true }
    ).select("-password");

    res.json({ ...user.toObject(), profilePic: null });
  } catch (err) {
    console.error("Error removing profile picture:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



