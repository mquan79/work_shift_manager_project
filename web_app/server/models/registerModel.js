const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  name: String,
  birthday: String,
  phone: String,
  id_card: String,
  address: String,
  status: Number
}, { versionKey: false });

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
