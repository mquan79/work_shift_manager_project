const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 80;
const userController = require('./server/controllers/userController');
const workshiftController = require('./server/controllers/workShiftController');
const workerController = require('./server/controllers/workerController');
const qrCodeController = require('./server/controllers/qrCodeController');
const historyPickerController = require('./server/controllers/historyPickerController');
const registerController = require('./server/controllers/registerController');
const messageController = require('./server/controllers/messageController');

mongoose.connect('mongodb://localhost:27017/work_shifts_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB:'));
db.once('open', () => {
  console.log('Đã kết nối đến MongoDB');
});

app.use(cors());
app.use(express.json());

app.get('/api/users', userController.getAllUsers);

app.get('/api/workshifts', workshiftController.getAllWorkshifts);
app.post('/api/workshifts', workshiftController.postWorkshift);
app.get('/api/workshifts/:id', workshiftController.getWorkshiftById);
app.put('/api/workshifts/:id', workshiftController.putWorkshift);
app.delete('/api/workshifts/:id', workshiftController.deleteWorkshift);


app.get('/api/workers', workerController.getAllWorkers);
app.post('/api/workers', workerController.createWorker);
app.get('/api/workers/:id', workerController.getWorkerById);
app.put('/api/workers/:id', workerController.updateWorker);
app.delete('/api/workers/:id', workerController.deleteWorker);

app.get('/api/qrcodes', qrCodeController.getAllQRCodes);
app.post('/api/qrcodes', qrCodeController.createQRCode);
app.delete('/api/qrcodes', qrCodeController.deleteAllQRCodes);

app.get('/api/historypickers', historyPickerController.getAllHistoryPickers);
app.post('/api/historypickers', historyPickerController.createHistoryPicker);
app.put('/api/historypickers/:id', historyPickerController.updateHistoryPicker);
app.get('/api/historypickers/workshift/:id', historyPickerController.getWorkshiftById);

app.get('/api/registers', registerController.getAllRegisters);
app.post('/api/registers', registerController.createRegister);
app.put('/api/registers/:id', registerController.updateRegister);
app.delete('/api/registers/:id', registerController.deleteRegister);

app.get('/api/messages', messageController.getMessage);
app.post('/api/messages', messageController.sendMessage);


app.listen(port, '192.168.1.10', () => {
  console.log(`Server is running on http://192.168.1.10:${port}`);
});