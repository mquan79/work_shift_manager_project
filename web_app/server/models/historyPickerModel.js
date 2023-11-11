const mongoose = require('mongoose');

const historyPickerSchema = new mongoose.Schema({
  id_workshift: String,
  id_worker: String,
  history_in_time: String,
  history_out_time: String,
}, { versionKey: false });

const HistoryPicker = mongoose.model('HistoryPicker', historyPickerSchema);

module.exports = HistoryPicker;
