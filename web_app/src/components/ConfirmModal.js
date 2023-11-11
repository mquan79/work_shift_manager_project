import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog d-flex align-items-center">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Xác nhận</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        <div className="check-circle-container">
                            <FontAwesomeIcon icon={faQuestionCircle} size="6x" color="black" />
                        </div>
                        <p className='message'>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
