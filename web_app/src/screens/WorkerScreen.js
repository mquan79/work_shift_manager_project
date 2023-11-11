import React, { useEffect, useState } from 'react';
import * as Api from '../api/apiCustomer';
import WorkerInfo from '../components/WorkerInfo';
import AddWorker from '../components/AddWorker';
import UpdateWorker from '../components/UpdateWorker';
import WorkerInfoByPhone from '../components/WorkerInfoByPhone';
import ConfirmModal from '../components/ConfirmModal'
import '../styles/styles.css'
function WorkerScreen() {
  const [workers, setWorkers] = useState([]);
  const [addWorkerAvailable, setAddWorkerAvailable] = useState(false);
  const [workerToUpdate, setWorkerToUpdate] = useState('');
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [phone, setPhone] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idWorkerDelete, setIdWorkerDelete] = useState();
  const openConfirm = (idWorker) => {
    setIsModalOpen(true);
    setIdWorkerDelete(idWorker)
  }
  const handleConfirm = () => {
    setIsModalOpen(false);
    deleteHandler(idWorkerDelete);
  }
  const fetchData = async () => {
    try {
      const data = await Api.get('workers');
      setWorkers(data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (idWorker) => {
    try {
      await Api.deleted(idWorker, 'workers');
      fetchData();
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const updateHandler = async (idWorker) => {
    const worker = workers.find((w) => w._id === idWorker);
    console.log(worker._id);
    setWorkerToUpdate(worker);
    setSelectedWorkerId('');
    setAddWorkerAvailable(false);
    setPhone('')
  };

  const addHandle = () => {
    setAddWorkerAvailable(true) 
    setWorkerToUpdate('') 
    setSelectedWorkerId('')
    setPhone('')
  }

  const preHandle = (idWorker) => {
    setSelectedWorkerId(idWorker)
    setAddWorkerAvailable(false) 
    setWorkerToUpdate('') 
    setPhone('')
  }

  const byPhoneHandle = (e) => {
    setPhone(e)
    setSelectedWorkerId('')
    setAddWorkerAvailable(false) 
    setWorkerToUpdate('') 
  }

  return (
    <div className=''>
      <div className='row'>
        <div className='col-md-6 text-light p-4'>
        <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} message="Bạn có chắc chắn muốn xóa người dùng?" />
          {phone&&<WorkerInfoByPhone phone={phone}/>}
          {selectedWorkerId && <WorkerInfo idWorker={selectedWorkerId} />}
          {addWorkerAvailable && <AddWorker add={() => fetchData()} />}
          {workerToUpdate && (
            <UpdateWorker worker={workerToUpdate} onUpdate={() => fetchData()} close={() => setWorkerToUpdate('')}/>
          )}

        </div>
        <div className='col-md-6 p-4'>
        <button
            className='btn btn-dark'
            onClick={() => addHandle()}
          >
            Thêm
          </button>
          <input className="form-control" type="text" onChange={(e) => byPhoneHandle (e.target.value)} />
          <ul className='list-group'>
            {workers.map((worker) => (
              <li className='list-group-item d-flex justify-content-between' key={worker._id}>
                {worker.name}
                <div>
                  <button
                    className='btn btn-dark'
                    onClick={() => preHandle(worker._id)}
                  >
                    Xem
                  </button>
                  <button
                    className='btn btn-dark'
                    onClick={() => updateHandler(worker._id)}
                  >
                    Sửa
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => openConfirm(worker._id)}
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkerScreen;
