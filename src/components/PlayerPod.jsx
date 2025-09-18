import React from 'react';
import './PlayerPod.css';

const pieceOrder = ['q', 'r', 'b', 'n', 'p'];

function PlayerPod({ player, time, isActive = false, captures = [], advantage = 0 }) {
  // THIS IS THE DEBUGGING LINE:
  // It will print the exact props this component receives every time it re-renders.
  console.log(`PlayerPod for ${player.username} received advantage:`, advantage);

  const podClasses = `player-pod ${isActive ? 'active' : ''}`;
  const sortedCaptures = [...captures].sort((a, b) => pieceOrder.indexOf(a.type) - pieceOrder.indexOf(b.type));

  return (
    <div className={podClasses}>
      <div className="player-main-info">
        <div className="player-details">
          <span className="username">{player.username}</span>
          <span className="rating">({player.rating})</span>
        </div>
        <div className="clock-display">{time}</div>
      </div>
      <div className="captured-pieces-container">
        <div className="captured-pieces">
          {sortedCaptures.map((piece, index) => (
            <img 
              key={index}
              src={`https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${piece.color}${piece.type}.png`}
              alt={`${piece.color}${piece.type}`}
              className="captured-piece-img"
            />
          ))}
        </div>
        {advantage > 0 && <div className="material-advantage">+{advantage}</div>}
      </div>
    </div>
  );
}

export default PlayerPod;