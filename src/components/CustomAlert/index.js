import React from 'react';
import './style.css';

function CustomAlert({ message, onConfirm, onCancel }) {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert">
        <p className='message-Alert'>{message}</p>
        <div className="alert-buttons">
          <button onClick={onCancel}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
