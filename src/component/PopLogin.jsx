import React from "react";
import "./popLogin.css";

const PopLogin = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  const popupClass = message === "Successfully logged in" ? "popup-success" : "popup-error";

  return (
    <div className="popup-model" onClick={onClose}>
      <div
        className={`popup-content ${popupClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{message}</h3>
        <button className="popup-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopLogin;
