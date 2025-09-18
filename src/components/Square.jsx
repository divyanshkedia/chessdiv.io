import React from 'react';

function Square({ piece, position, onSquareClick, isSelected, isLegalMove, onPieceDrop, onDragStart }) {
  const pieceImage = piece ? `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${piece.color}${piece.type}.png` : '';
  const squareClasses = `square ${(position.charCodeAt(0) + parseInt(position[1], 10)) % 2 === 1 ? 'dark' : 'light'} ${isSelected ? 'selected' : ''}`;

  function handleDragStart(e) {
    if (piece) {
      onDragStart(position);
      e.dataTransfer.setData('text/plain', position);
      e.dataTransfer.effectAllowed = "move";
    } else {
      e.preventDefault();
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const fromSquare = e.dataTransfer.getData('text/plain');
    onPieceDrop(fromSquare, position);
  }

  return (
    <div 
      className={squareClasses} 
      onClick={() => onSquareClick(position)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isLegalMove && <div className="legal-move-dot" />}
      {pieceImage && (
        <img 
          src={pieceImage} 
          alt={`${piece?.color}${piece?.type}`} 
          className="piece"
          draggable="true"
          onDragStart={handleDragStart}
        />
      )}
    </div>
  );
}

export default Square;