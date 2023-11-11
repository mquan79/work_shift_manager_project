import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import * as userApi from '../api/apiCustomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import CustomModal from '../components/CustomModal';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const [user, setUser] = useState([]);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isCorret, setIsCorret] = useState(true);
  
  const checkUser = user.find((userfind) => userfind.username === username && userfind.password === password);
  const openModal = () => {
      setModalOpen(true);
      handleLogin();
  };

  const closeModal = () => {
      setModalOpen(false);
      if (checkUser) {
        const idUser = checkUser._id;
        setCookie('user', { username, password, idUser }, { path: '/' })
      } else {
        setMessage('Sai mật khẩu');
        setIsCorret(false);
      }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await userApi.get('users');
      setUser(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    }
  };

  const handleLogin = () => {
    if (checkUser) {
      setMessage('Đăng nhập thành công');
      setIsCorret(true)
    } else {
      setMessage('Sai mật khẩu');
      setIsCorret(false);
    }
  };

  return (
    <div className='container mt-5'>
      <h2 className='mb-3'>Đăng nhập</h2>
      <div className='mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Tên tài khoản'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='mb-3 d-flex'>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          className='form-control'
          placeholder='Mật khẩu'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='btn btn-outline-secondary px-2 m-0'
          type='button'
          onClick={() => setPasswordVisible(!isPasswordVisible)}
        >
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
        </button>
      </div>

      <button className='btn btn-dark' onClick={openModal}>Login</button>
      <CustomModal isCorret = {isCorret} isOpen={isModalOpen} onClose={closeModal} message={message}/>


    </div>
  );
}

export default Login;
