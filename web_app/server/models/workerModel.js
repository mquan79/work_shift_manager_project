const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: String,
  birthday: String,
  phone: String,
  id_card: String,
  address: String,
  password: String,
}, { versionKey: false });

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
