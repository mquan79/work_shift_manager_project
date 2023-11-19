import React, { useEffect, useState } from 'react';
import * as Api from '../api/apiCustomer';

function WorkShiftInfo({ idWS, onClose }) {
  const [workshift, setWorkShift] = useState({});
  const [histories, setHistories] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Api.getById(idWS, 'workshifts');
        setWorkShift(data);

        const result = await Api.get('historypickers');
        setHistories(result);

        const dataWorker = await Api.get('workers');
        setWorkers(dataWorker);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, [idWS]);

  const history = histories.filter((item) => item.id_workshift === idWS);

  const getNameById = (id) => {
    const worker = workers.find((item) => item._id.toString() === id);
    return worker ? worker.name : 'Unknown';
  };

  return (
    <div className="mt-3">
      <ul className="list-group">
        <li className="list-group-item">Lương: {workshift.salary}</li>
        <li className="list-group-item">Ngày: {workshift.date}</li>
        <li className="list-group-item">Thời gian: {workshift.time}</li>
        <li className="list-group-item">Công việc: {workshift.work}</li>
        <li className="list-group-item">
          Số công nhân hiện tại: {workshift.currentNumberWorker}/{workshift.maxNumberWorker}
        </li>
        <li className="list-group-item">Danh sách nhân viên: 
          {history.map((item) => (
            <li className="list-group-item d-flex justify-content-between" key={item._id}>
              {getNameById(item.id_worker)}
            </li>
          ))}
        </li>
      </ul>
      <button className="btn btn-dark" onClick={() => onClose()}>Đóng</button>
    </div>
  );
}

export default WorkShiftInfo;
