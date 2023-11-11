const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  qrcode: String,
  id_workshift: String,
  type: String,
}, { versionKey: false });

const QRCode = mongoose.model('QRCode', qrCodeSchema);

module.exports = QRCode;
