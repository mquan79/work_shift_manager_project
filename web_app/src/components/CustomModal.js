import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

function CustomModal({ isCorret, isOpen, onClose, message }) {
    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog d-flex align-items-center">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title ">Thông báo</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    {isCorret ? (
                        <div className="modal-body text-center">
                        <div className="check-circle-container">
                            <FontAwesomeIcon icon={faCheckCircle} size="6x" color="green" />
                        </div>
                        <p className='message'>{message}</p>
                    </div>
                    ) : (
                        <div className="modal-body text-center">
                            <div className="check-circle-container">
                                <FontAwesomeIcon icon={faTimesCircle} size="6x" color="red" />
                            </div>
                            <p className='message'>{message}</p>
                        </div>
                    )}

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomModal;
