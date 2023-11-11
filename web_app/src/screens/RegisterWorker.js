import React, { useEffect, useState } from 'react';
import * as Api from '../api/apiCustomer';
import * as XLSX from 'xlsx';
import ConfirmModal from '../components/ConfirmModal'
import InfoRegister from '../components/InfoRegister'
import * as time from '../components/time'
function RegisterWorker() {
  const [registers, setRegister] = useState([]);
  const [canExport, setCanExport] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [phoneRegister, setPhoneRegister] = useState('');
  const [isShowInfoReg, setIsShowInfoReg] = useState(false)
  const openModal = () => {
    setIsDeleteModalOpen(true);
  }
  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    exportToExcel();
  }
  const fetchData = async () => {
    try {
      const data = await Api.get('registers');
      setRegister(data);
      setCanExport(data.length > 0);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const registerAccept = registers.filter((reg) => reg.status === 1)
  const deleteRegister = async () => {
    for (const res of registerAccept) {
      await Api.deleted(res._id, 'registers');
    }
    fetchData();
  };

  const date = time.getToday();
  const exportToExcel = () => {
    if(!registerAccept.length) {
      return;
    }
    const formattedData = registerAccept.map(({ _id, ...rest }) => rest);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData, { skipHeader: true });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, `registers-${date}.xlsx`);
    deleteRegister();
  };

  const handlePre = () => {
    setIsShowInfoReg(true)
  }

  return (
    <div className="container mt-4">
      <div className='mb-3 input-group'>
        <input
          type='text'
          className='form-control'
          onChange={(e) => setPhoneRegister(e.target.value)}
        />
        <button
          className='btn btn-dark'
          type='button'
          onClick={() => handlePre()}
        >Tìm</button>
      </div>
      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} message="Bạn có chắc chắn muốn xuất file này?" />
      {canExport ? (
        <button className="btn btn-dark" onClick={openModal}>
          Duyệt đơn đăng ký
        </button>
      ) : (
        <p>Không có ai đăng ký</p>
      )}
      <div className='row'>
        <div className='col-md-6'>
          <ul className="list-group">
            {registers.map((register) => (
              <li key={register._id} className={`list-group-item d-flex justify-content-between align-items-center ${register.status === 1 ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                {register.name}
                <span className="ml-auto">
                  {register.status === 1 ? 'Đã xác nhận' : 'Chưa xác nhận'}
                </span>
              </li>
            ))}
          </ul>


        </div>
        <div className='col-md-6'>
          {isShowInfoReg && (
            <div>
              <InfoRegister phone={phoneRegister} onUpdate={() => fetchData()}/>
              <button className='btn btn-dark' onClick={() => setIsShowInfoReg(false)}>Đóng</button>
            </div>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default RegisterWorker;
