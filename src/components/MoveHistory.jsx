import React from 'react';
import './MoveHistory.css'; // Don't forget to import the new CSS

function MoveHistory({ history }) {
  const movePairs = [];

  // This loop processes the flat history array from chess.js
  // It takes two moves at a time (e.g., 'e4' and 'e5') and groups them.
  for (let i = 0; i < history.length; i += 2) {
    movePairs.push({
      moveNumber: i / 2 + 1,
      white: history[i],
      black: history[i + 1] || null, // Handle games with an odd number of moves
    });
  }

  return (
    <div className="move-history-container">
      {movePairs.map((pair) => (
        <div key={pair.moveNumber} className="move-pair">
          <div className="move-number">{pair.moveNumber}.</div>
          <div className="move">{pair.white}</div>
          {pair.black && <div className="move">{pair.black}</div>}
        </div>
      ))}
    </div>
  );
}

export default MoveHistory;