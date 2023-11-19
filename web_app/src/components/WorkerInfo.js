import React, { useEffect, useState } from 'react';
import * as Api from '../api/apiCustomer';
import * as time from './time';

function WorkerInfo({ idWorker }) {
  const [worker, setWorker] = useState({});
  const [picker, setPicker] = useState([]);
  const [workshifts, setWorkshifts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Api.getById(idWorker, 'workers');
        setWorker(data);

        const dataPicker = await Api.get('historypickers');
        setPicker(dataPicker);

        const dataWS = await Api.get('workshifts');
        setWorkshifts(dataWS);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, [idWorker]);

  let historyOut = 0;
  let miss = 0;
  const today = time.getToday();

  const pickerWorker = picker.filter((item) => item.id_worker === idWorker);

  for (const i of pickerWorker) {
    const ws = workshifts.find((item) => item._id === i.id_workshift);

    if (i.history_out_time !== '') {
      historyOut++;
    }

    if (i.history_out_time === '' && ws && new Date(ws.date) < new Date (today)) {
      miss++;
    } 
  }

  return (
    <div className="container mt-4">
      <h2 className="form-name">Thông tin người dùng</h2>
      <ul className="list-group">
        <li className="list-group-item">Tên: {worker.name}</li>
        <li className="list-group-item">Ngày sinh: {worker.birthday}</li>
        <li className="list-group-item">Số điện thoại: {worker.phone}</li>
        <li className="list-group-item">Chứng minh nhân dân: {worker.id_card}</li>
        <li className="list-group-item">Địa chỉ: {worker.address}</li>
        <li className="list-group-item">Số lần đăng ký: {pickerWorker.length}</li>
        <li className="list-group-item">Số lần thành công: {historyOut}</li>
        <li className="list-group-item">Số lần không đi làm: {miss}</li>
      </ul>
    </div>
  );
}

export default WorkerInfo;
