import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Login from './screens/Login';
import QRCodeScreen from './screens/QRCodeScreen';
import WorkShiftScreen from './screens/WorkShiftScreen';
import WorkerScreen from './screens/WorkerScreen';
import RegisterWorker from './screens/RegisterWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomModal from './components/CustomModal'
import './styles.css';

function App() {
  const [cookies, , removeCookie] = useCookies(['user']);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true)  
};

const closeModal = () => {
    setModalOpen(false);
    removeCookie('user');
};
  return (
    <Router>
      {cookies.user ? (
        <>
        
      <CustomModal isCorret = {true} isOpen={isModalOpen} onClose={closeModal} message='Đăng xuất thành công'/>
          <div className='container-fluid bg-dark py-3'>
            <div className="container">
              <nav className='navbar navbar-expand-lg'>
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <Link to="/" className='nav-link'>QR CODE</Link>
                  </li>
                  <li className='nav-item'>
                    <Link to="/workshift" className='nav-link'>Work Shift</Link>
                  </li>
                  <li className='nav-item'>
                    <Link to="/worker" className='nav-link'>Worker</Link>
                  </li>
                  <li className='nav-item'>
                    <Link to="/register" className='nav-link'>Register</Link>
                  </li>
                </ul>
                <ul className='navbar-nav ms-auto'>
                  <li className='nav-item'><button onClick={openModal} className='btn btn-danger btn-logout'>Đăng Xuất</button></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="container mt-3">
            <Routes>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/" element={<QRCodeScreen />} />
              <Route path='/workshift' element={<WorkShiftScreen />} />
              <Route path='/worker' element={<WorkerScreen />} />
              <Route path='/register' element={<RegisterWorker />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/workshift" element={<Navigate to="/login" />} />
          <Route path="/worker" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
