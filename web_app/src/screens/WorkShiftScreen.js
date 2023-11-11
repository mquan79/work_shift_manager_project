import React, { useState, useEffect } from 'react';
import * as Api from '../api/apiCustomer';
import WorkShiftInfo from '../components/WorkShiftInfo';
import AddWorkShift from '../components/AddWorkShift'
import * as time from '../components/time'
import CustomModal from '../components/CustomModal'
import ConfirmModal from '../components/ConfirmModal'
function WorkShiftScreen() {
  const [workshifts, setWorkShifts] = useState([]);
  const [idWS, setIdWS] = useState('');
  const [addWSAviable, setAddWSAviable] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const [message, setMessage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const closeAdd = () => {
    setAddWSAviable(false);
  }
  const openModal = () => {
    setModalOpen(true);
    addManyWorkShifts();
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const fetchData = async () => {
    try {
      const data = await Api.get('workshifts');
      setWorkShifts(data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const times = ['7:00-11:00', '13:00-17:00', '18:00-22:00', '22:00-2:00', '2:00-6:00'];
  const date = new Date();
  const addManyWorkShifts = async () => {
    const checkWorkshift = workshifts.find((ws) => ws.date === time.getTomorrow())
    if (checkWorkshift) {
      setIsCorrect(false);
      setMessage('Ca làm đã tồn tại')
      return;
    }
    setIsCorrect(true);
    try {
      for (const i of times) {
        const salary = (i === '22:00-2:00' || i === '2:00-6:00') ? 28000 : 22000;
    
        await Api.add({
          salary: salary,
          date: time.getTomorrow(),
          time: i,
          work: 'Phân loại hàng hóa',
          maxNumberWorker: 10,
          currentNumberWorker: 0,
          dateAndTime: date
        }, 'workshifts');
    
        setMessage('Ca làm đã được thêm');
        fetchData();
      }
    } catch (error) {
      console.log('Error: ', error);
    }
    
  }


  const handleConfirmDelete = async() => {
    setIsCorrect(true);
    setIsDeleteModalOpen(false);
    try {
      console.log('Xóa ca làm thành công');
      await Api.deleted(idDelete, 'workshifts');
      fetchData();
    } catch (error) {
      console.log('Error : ', error);
    }
  }

  const deleteHanlde = async (idWS) => {
    setIdDelete(idWS)
    setIsDeleteModalOpen(true);
    setIsCorrect(false)
  }


  return (
    <div className="container mt-4">
      {idWS && <WorkShiftInfo idWS={idWS} />}
      {addWSAviable && <AddWorkShift add={() => fetchData()} close={() => closeAdd()}/>}
      <CustomModal isCorret={isCorrect} isOpen={isModalOpen} onClose={closeModal} message={message} />
      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} message="Bạn có chắc chắn muốn xóa ca làm này không?" />
      <button className="btn btn-dark" onClick={() => openModal()}>Thêm ca làm việc</button>
      <button className="btn btn-dark" onClick={() => setAddWSAviable(true)}>Thêm ca làm phụ</button>
      <ul className="list-group mt-3">
        {workshifts.map((workshift) => (
          <li className="list-group-item d-flex justify-content-between" key={workshift._id}>
            {workshift.work}, Ngày {workshift.date}, Ca {workshift.time}
            <div>
              <button className="btn btn-dark" onClick={() => setIdWS(workshift._id)}>Xem</button>
              <button className="btn btn-danger" onClick={() => deleteHanlde(workshift._id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default WorkShiftScreen;
