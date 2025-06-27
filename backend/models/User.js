const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  address: String,
  mobile: String,
  profilePic: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model('User', userSchema);
