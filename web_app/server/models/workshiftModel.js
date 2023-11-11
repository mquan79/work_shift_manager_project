const mongoose = require('mongoose');

const workshift = new mongoose.Schema({
    salary: Number,
    date: String,
    time: String,
    work: String,
    maxNumberWorker: Number,
    currentNumberWorker: Number,
    dateAndTime: Date,
  }, { versionKey: false });

const WorkShift = mongoose.model('WorkShifts', workshift)

module.exports = WorkShift;