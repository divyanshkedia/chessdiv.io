import React from 'react';
import Square from './Square';
import './CustomChessboard.css';

function CustomChessboard({ board, orientation, onSquareClick, selectedSquare, legalMoves, onPieceDrop, onDragStart }) {
  const finalBoard = orientation === 'white' ? board : [...board].reverse().map(row => [...row].reverse());

  return (
    <div className="chessboard">
      {finalBoard.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const position = orientation === 'white'
            ? `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`
            : `${String.fromCharCode(104 - colIndex)}${1 + rowIndex}`;
          return (
            <Square
              key={position}
              piece={piece}
              position={position}
              onSquareClick={onSquareClick}
              isSelected={position === selectedSquare}
              isLegalMove={legalMoves.includes(position)}
              onPieceDrop={onPieceDrop}
              onDragStart={onDragStart}
            />
          );
        })
      )}
    </div>
  );
}

export default CustomChessboard;