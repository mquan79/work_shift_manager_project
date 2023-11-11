import { useEffect, useState } from 'react';
import * as Api from '../api/apiCustomer';
import CustomModal from './CustomModal'
function InfoRegister({ phone, onUpdate }) {
  const [register, setRegister] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idRegister, setIdRegister] = useState('')
  const openModal = (idReg) => {
    setIsModalOpen(true)
    setIdRegister(idReg)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    updateStatus(idRegister)
  }
  useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await Api.get('registers');
          const foundRegister = data.find((reg) => reg.phone === phone);
          setRegister(foundRegister);
        } catch (e) {
          console.log('Error', e);
        }
      };
    fetchData();
  }, [phone]);

  const updateStatus = async(idReg) => {
    try {
        await Api.updated(idReg, {"status" : 1}, 'registers');
        onUpdate();
    } catch (error) {
        console.log('Error : ', error)
    }
  }

  return (
    <div>
      {register ? (
        <div className="container">
            <CustomModal isCorret = {true} isOpen={isModalOpen} onClose={closeModal} message='Cập nhập thành công'/>
          <h2 className="form-name">Thông tin người đăng kí</h2>
          <ul className="list-group">
            <li className="list-group-item">Tên: {register.name}</li>
            <li className="list-group-item">Ngày Sinh: {register.birthday}</li>
            <li className="list-group-item">Số Điện Thoại: {register.phone}</li>
            <li className="list-group-item">Chứng Minh Nhân Dân: {register.id_card}</li>
            <li className="list-group-item">Địa Chỉ: {register.address}</li>
          </ul>
          <button className='btn btn-dark' onClick={() => openModal(register._id)}>Duyệt</button>
        </div>
      ) : (
        <div className="container">
          <h2 className="form-name">Không tìm thấy người đăng kí...</h2>
        </div>
      )}
    </div>
  );
}

export default InfoRegister;
