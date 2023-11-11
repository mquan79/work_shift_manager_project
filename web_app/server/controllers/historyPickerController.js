const HistoryPicker = require('../models/historyPickerModel');
const WorkShift = require('../models/workshiftModel');
const getAllHistoryPickers = async (req, res) => {
  try {
    const historypickers = await HistoryPicker.find({});
    res.json(historypickers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHistoryPicker = async (req, res) => {
  try {
    const newHistoryPicker = new HistoryPicker(req.body);
    await newHistoryPicker.save();
    res.status(201).json(newHistoryPicker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHistoryPicker = async (req, res) => {
  try {
    const historyPicker = await HistoryPicker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!historyPicker) {
      return res.status(404).json({ error: 'Không tìm thấy lịch sử để cập nhật' });
    }
    res.json(historyPicker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkshiftById = async (req, res) => {
  try {
    const workshifts = await WorkShift.findById(req.params.id);
    if (!workshifts) {
      return res.status(404).json({ error: 'Không tìm thấy ca làm' });
    }
    res.json(workshifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllHistoryPickers,
  createHistoryPicker,
  updateHistoryPicker,
  getWorkshiftById
};
