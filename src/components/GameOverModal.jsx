import React from 'react';
import './GameOverModal.css';

function GameOverModal({ message, onReset }) {
  // This component doesn't render anything if there's no message
  if (!message) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Game Over</h2>
        <p>{message}</p>
        <button onClick={onReset}>Play Again</button>
      </div>
    </div>
  );
}

export default GameOverModal;