import React from 'react';
import './ActionBar.css';

function ActionButton({ icon, label, onClick }) {
  return (
    <button className="action-button" title={label} onClick={onClick}>
      <span className="icon">{icon}</span>
      <span className="label">{label}</span>
    </button>
  );
}

function ActionBar({ onReset, onFlip, isWhiteTurn, setGameOverMessage }) {
  function handleResign() {
    const resigningPlayer = isWhiteTurn ? 'White' : 'Black';
    setGameOverMessage(`${resigningPlayer} has resigned.`);
  }

  return (
    <div className="action-bar">
      <ActionButton icon="½" label="Draw" onClick={() => alert('Draw offer logic not implemented yet.')} />
      <ActionButton icon="🏳️" label="Resign" onClick={handleResign} />
      <ActionButton icon="🔄" label="Flip" onClick={onFlip} />
      <ActionButton icon="⚙️" label="Reset" onClick={onReset} />
    </div>
  );
}

export default ActionBar;