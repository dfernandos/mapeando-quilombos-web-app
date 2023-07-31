import React from 'react';
import './style.css';

function CustomModal({ isOpen, onClose, children }) {
  return isOpen ? (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <button className="custom-modal-close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  ) : null;
}

export default CustomModal;
