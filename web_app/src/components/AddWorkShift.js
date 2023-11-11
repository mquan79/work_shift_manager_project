import React, { useState } from 'react';
import * as Api from '../api/apiCustomer';
import * as time from '../components/time';
import CustomModal from './CustomModal'
function AddWorkShift({ add, close }) {
  const [newWorkShift, setNewWorkShift] = useState({
    maxNumberWorker: 0,
    selectedTime: '',
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const [message, setMessage] = useState(null)
  const openModal = () => {
    setModalOpen(true);
    addWSHandle()
};

const closeModal = () => {
    setModalOpen(false);
};

  const date = new Date();

  const addWSHandle = async () => {
    if (newWorkShift.maxNumberWorker <= 0) {
      setMessage('Vui lòng nhập số công nhân hợp lệ.');
      setIsCorrect(false);
      return; 
    }

    if (!newWorkShift.selectedTime) {
      setMessage('Vui lòng chọn giờ làm việc.');
      setIsCorrect(false);
      return; 
    }
    setIsCorrect(true);
    setMessage('Thêm ca làm thành công')
    try {
      const salary = (newWorkShift.selectedTime === '22:00-2:00' || newWorkShift.selectedTime === '2:00-6:00') ? 28000 : 22000;
      await Api.add({
        salary: salary,
        date: time.getTomorrow(),
        time: newWorkShift.selectedTime,
        work: 'Ca làm tăng cường',
        maxNumberWorker: newWorkShift.maxNumberWorker,
        currentNumberWorker: 0,
        dateAndTime: date,
      }, 'workshifts');
      add();
    } catch (error) {
      console.log(error);
    }
  };

  const times = ['7:00-11:00', '13:00-17:00', '18:00-22:00', '22:00-2:00', '2:00-6:00'];

  return (
    <div className="mt-3">
      <CustomModal isCorret = {isCorrect} isOpen={isModalOpen} onClose={closeModal} message={message}/>
      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Nhập số công nhân"
          value={newWorkShift.maxNumberWorker}
          onChange={(e) => setNewWorkShift({ ...newWorkShift, maxNumberWorker: e.target.value })}
        />
        <select
          className="form-select"
          value={newWorkShift.selectedTime}
          onChange={(e) => setNewWorkShift({ ...newWorkShift, selectedTime: e.target.value })}
        >
          <option value="">Chọn giờ làm việc</option>
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <button className="btn btn-dark" onClick={openModal}>
          Thêm ca làm
        </button>
        <button className="btn btn-dark" onClick={close}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default AddWorkShift;
