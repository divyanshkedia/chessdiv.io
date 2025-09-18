import React from 'react';

function Square({ piece, position, onSquareClick, isSelected, isLegalMove, onPieceDrop }) {
  const pieceImage = piece ? `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${piece.color}${piece.type}.png` : '';
  const squareClasses = `square ${(position.charCodeAt(0) + parseInt(position[1])) % 2 === 1 ? 'light' : 'dark'} ${isSelected ? 'selected' : ''}`;

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', position);
  }

  function handleDragOver(e) {
    e.preventDefault(); // This is necessary to allow a drop
  }

  function handleDrop(e) {
    e.preventDefault();
    const fromSquare = e.dataTransfer.getData('text/plain');
    const toSquare = position;
    onPieceDrop(fromSquare, toSquare);
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