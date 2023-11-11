const Worker = require('../models/workerModel');

const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find({});
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createWorker = async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    await newWorker.save();
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!worker) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng để sửa' });
    }
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng để xóa' });
    }
    res.json({ message: 'Người dùng đã được xóa' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker
};
