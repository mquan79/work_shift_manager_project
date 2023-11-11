const WorkShift = require('../models/workshiftModel');
const getAllWorkshifts = async (req, res) => {
    try {
      const workshifts = await WorkShift.find({});
      res.json(workshifts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
const postWorkshift = async (req, res) => {
    try {
      const newWorkShift = new WorkShift(req.body);
      await newWorkShift.save();
      res.status(201).json(newWorkShift);
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
  
const putWorkshift = async (req, res) => {
    try {
      const workshifts = await WorkShift.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!workshifts) {
        return res.status(404).json({ error: 'Không tìm thấy ca làm để sửa' });
      }
      res.json(workshifts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
const deleteWorkshift = async (req, res) => {
    try {
      const workshifts = await WorkShift.findByIdAndDelete(req.params.id);
      if (!workshifts) {
        return res.status(404).json({ error: 'Không tìm thấy ca làm để xóa' });
      }
      res.json({ message: 'Ca làm đã được xóa' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    getAllWorkshifts,
    getWorkshiftById,
    postWorkshift,
    putWorkshift,
    deleteWorkshift
  };