const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  type: String,
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
