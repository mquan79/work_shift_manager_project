import React, { useState, useEffect } from 'react';
import * as Api from '../api/apiCustomer';
import ConfirmModal from './ConfirmModal'
function UpdateWorker({ worker, onUpdate, close }) {
  const [workerUpdate, setWorkerUpdate] = useState({ ...worker });
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openConfirm = () => {
    setIsModalOpen(true);
  }
  const handleConfirm = () => {
    setIsModalOpen(false);
    handleUpdateUser();
    close();
  }
  useEffect(() => {
    setWorkerUpdate({ ...worker }); 
  }, [worker]);

  const handleUpdateUser = async () => {
    try {
      await Api.updated(worker._id, workerUpdate, 'workers');
      onUpdate();
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkerUpdate({ ...workerUpdate, [name]: value }); 
  };

  return (
    <div className="container ">
      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} message="Bạn có chắc chắn muốn thay đổi thông tin?" />
      <h2 className="form-name">Cập Nhật Thông Tin Người Dùng</h2>
      <div className="mb-3">
        <label className="form-label">Tên:</label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={workerUpdate.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Sinh Nhật:</label>
        <input
          className="form-control"
          type="date"
          name="birthday"
          value={workerUpdate.birthday}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Số Điện Thoại:</label>
        <input
          className="form-control"
          type="text"
          name="phone"
          value={workerUpdate.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Chứng Minh Nhân Dân:</label>
        <input
          className="form-control"
          type="text"
          name="id_card"
          value={workerUpdate.id_card}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Địa Chỉ:</label>
        <input
          className="form-control"
          type="text"
          name="address"
          value={workerUpdate.address}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-dark" onClick={openConfirm}>
        Cập Nhật Người Dùng
      </button>
    </div>
  );
}

export default UpdateWorker;
