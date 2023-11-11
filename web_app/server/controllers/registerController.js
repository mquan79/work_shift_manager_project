const Register = require('../models/registerModel');

const getAllRegisters = async (req, res) => {
  try {
    const registers = await Register.find({});
    res.json(registers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRegister = async (req, res) => {
  try {
    const newRegister = new Register(req.body);
    await newRegister.save();
    res.status(201).json(newRegister);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRegister = async (req, res) => {
  try {
    const register = await Register.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!register) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng để cập nhật' });
    }
    res.json(register);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRegister = async (req, res) => {
  try {
    const register = await Register.findByIdAndDelete(req.params.id);
    if (!register) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng để xóa' });
    }
    res.json({ message: 'Người dùng đã được xóa' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRegisters,
  createRegister,
  updateRegister,
  deleteRegister
};
