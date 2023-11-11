import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode.react';
import * as Api from '../api/apiCustomer';
import * as time from '../components/time';
import * as text from '../components/text';
import CustomModal from '../components/CustomModal'
import '../styles.css'
function QRCodeScreen() {
    const [randomText, setRandomText] = useState('');
    const [statusQRCode, setStatus] = useState('in');
    const [workshifts, setWorkShifts] = useState([]);
    const [message, setMessage] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const openModal = () => {
      setModalOpen(true);
      createQRCode();
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await Api.get('workshifts');
            setWorkShifts(data);
        } catch (error) {
            console.log('Error workshift: ', error)
        }
    }

    const createQRCode = async () => {
        const today = time.getToday();
        const hours = time.getHoursToday();
        const randomString = text.randomQRCode();
        const workshiftToday = workshifts.filter((ws) => ws.date === today);
        if(statusQRCode==='in') {
            const workShiftHour = workshiftToday.find((wsH) => time.getHoursIn(wsH.time) === (hours+1))
            if(workShiftHour){
                const idWorkshift = String(workShiftHour._id);
                try {
                    await Api.deletedAll('qrcodes');
                    await Api.add({
                        qrcode: randomString,
                        id_workshift: idWorkshift,
                        type: statusQRCode
                    }, 'qrcodes');
                } catch (error) {
                    console.error('Error saving QR data:', error);
                }
                setRandomText(randomString);
                setMessage('Tạo mã thành công');
                setIsCorrect(true);
                setStatus(prevStatus => (prevStatus === 'in' ? 'out' : 'in'));
            } else {
                setIsCorrect(false)
                setMessage('Chưa đến giờ vào ca')
            }
        }

        if(statusQRCode==='out') {
            const workShiftHour = workshiftToday.find((wsH) => time.getHoursOut(wsH.time) === (hours))
            if(workShiftHour){
                const idWorkshift = String(workShiftHour._id);
                try {
                    await Api.deletedAll('qrcodes');
                    await Api.add({
                        qrcode: randomString,
                        id_workshift: idWorkshift,
                        type: statusQRCode
                    }, 'qrcodes');
                } catch (error) {
                    console.error('Error saving QR data:', error);
                }
                setRandomText(randomString);
                setIsCorrect(true)
                setMessage('Tạo mã thành công');
                setStatus(prevStatus => (prevStatus === 'in' ? 'out' : 'in'));
            } else {
                setIsCorrect(false)
                setMessage('Chưa đến giờ ra ca')
            }
        }


    }

    return (
        <div className="container mt-4 d-flex align-items-center justify-content-center flex-column">
            <CustomModal isCorret = {isCorrect} isOpen={isModalOpen} onClose={closeModal} message={message}/>
          <button className="btn btn-dark " onClick={openModal}>
            {statusQRCode==='in' ? ('Tạo mã QR vào ca') : ('Tạo mã QR ra ca')}
          </button>
          {randomText && (
            <div className="card">
              <div className="card-body">
                <QRCode value={randomText} />
              </div>
            </div>
          )}
        </div>
      );
}

export default QRCodeScreen

