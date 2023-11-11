import React, { useEffect, useState } from 'react'
import * as Api from '../api/apiCustomer'
function WorkShiftInfo(idWS) {
   const [workshift, setWorkShift] = useState({});

   console.log(idWS.idWS);
   useEffect(() => {
    const fetchData = async() => {
        try{
            const data = await Api.getById(idWS.idWS, 'workshifts');
            setWorkShift(data);
        } catch(error) {
            console.log('Error : ', error);
        }
       }
       fetchData();
   }, [idWS])
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
      </ul>
    </div>
  );
}

export default WorkShiftInfo
