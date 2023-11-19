import React, { useEffect, useState } from 'react';
import * as Api from '../api/apiCustomer';
import * as time from './time';

function WorkerInfo({ phone }) {
  const [workers, setWorker] = useState(null);
  const [picker, setPicker] = useState([]);
  const [workshifts, setWorkshifts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Api.get('workers');
        const worker = data.find((w) => w.phone === phone);

        if (worker) {
          setWorker(worker);

          const dataPicker = await Api.get('historypickers');
          setPicker(dataPicker);

          const dataWS = await Api.get('workshifts');
          setWorkshifts(dataWS);
        } else {
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, [phone]);

  let historyOut = 0;
  let miss = 0;
  const today = time.getToday();
  const pickerWorker = picker.filter((pick) => pick.id_worker === workers._id)
  for (const i of pickerWorker) {
    const ws = workshifts.find((item) => item._id === i.id_workshift);

    if (i.history_out_time !== '') {
      historyOut++;
    }

    if (i.history_out_time === '' && ws && ws.date < today) {
      miss++;
    } 
  }

  return (
    <div className="container mt-4">
      {workers ? (
        <>
          <h2 className="form-name">Thông tin người dùng</h2>
          <ul className="list-group">
            <li className="list-group-item">Tên: {workers.name}</li>
            <li className="list-group-item">Ngày sinh: {workers.birthday}</li>
            <li className="list-group-item">Số điện thoại: {workers.phone}</li>
            <li className="list-group-item">Chứng minh nhân dân: {workers.id_card}</li>
            <li className="list-group-item">Địa chỉ: {workers.address}</li>
            <li className="list-group-item">Số lần đăng ký: {pickerWorker.length}</li>
            <li className="list-group-item">Số lần thành công: {historyOut}</li>
            <li className="list-group-item">Số lần không đi làm: {miss}</li>
          </ul>
        </>
      ) : (
        <h2 className="form-name">Không có kết quả</h2>
      )}
    </div>
  );
}

export default WorkerInfo;
