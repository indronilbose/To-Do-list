import React from 'react';
import './Popup.css';

const Popup = ({ isOpen, onClose, message}) => {
  if (!isOpen) return null;
//User already exists
  const popupClass = message === 'User already exists' ? 'popup-error' : 'popup-success';

  return (
    <div className='popup-model' onClick={onClose}>
      <div className={`popup-content ${popupClass}`} onClick={(e) => e.stopPropagation()}>
        <h3>{message}</h3>
        <button className="popup-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
