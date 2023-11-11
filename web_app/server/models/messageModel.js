const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    id_worker: String,
    message: String
}, { versionKey: false });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
