const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  address: String,
  mobile: String,
  profilePic: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model('User', userSchema);
