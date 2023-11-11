import React, { useState } from 'react';
import * as Api from '../api/apiCustomer';
import * as XLSX from 'xlsx';
import * as text from './text'
import CustomModal from './CustomModal'
function AddWorker({ add }) {
const [excelData, setExcelData] = useState(null);
const [isOpenModal, setIsOpenModal] = useState(false);
const [isCorrect, setIsCorrect] = useState(true);
const [message, setMessage] = useState('');

  const openModal = () => {
    setIsOpenModal(true);
    handleAddUser();
  }

  const closeModal = () => {
    setIsOpenModal(false);
  }
  const handleAddUser = async () => {
    if (!excelData) {
      setMessage('Vui lòng chọn file dữ liệu');
      setIsCorrect(false)
      return;
    }
    for(const data of excelData) {
        try {
            await Api.add({
              name: data[0],
              birthday: data[1],
              phone: data[2],
              id_card: data[3],
              address: data[4],
              password: text.generateRandomPassword(8),
              point: 50
            }, 'workers');
            setIsCorrect(true);
            setMessage('Người dùng mới đã được thêm:');
            add();
          } catch (error) {
            console.error('Lỗi khi thêm người dùng:', error);
          }
        setExcelData(null);
    }
    

  };

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });

    const sheetName = workbook.SheetNames[0]; 
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    setExcelData(jsonData);
  };

  reader.readAsBinaryString(file);

  console.log(excelData)
};

return (
  <div className="container mt-4">
    <div className="mb-3">
    <CustomModal isCorret = {isCorrect} isOpen={isOpenModal} onClose={closeModal} message={message}/>
      <input className="form-control" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
    <button className="btn btn-dark" onClick={openModal}>Thêm Người Dùng</button>
  </div>
);
}

export default AddWorker;
