const QRCode = require('../models/qrCodeModel');

const getAllQRCodes = async (req, res) => {
  try {
    const qrcodes = await QRCode.find({});
    res.json(qrcodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQRCode = async (req, res) => {
  try {
    const newQRCode = new QRCode(req.body);
    await newQRCode.save();
    res.status(201).json(newQRCode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAllQRCodes = async (req, res) => {
  try {
    await QRCode.deleteMany({});
    res.json({ message: 'Tất cả mã QR đã được xóa' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllQRCodes,
  createQRCode,
  deleteAllQRCodes
};
