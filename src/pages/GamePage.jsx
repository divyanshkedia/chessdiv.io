import React, { useState, useMemo } from 'react';
import { Chess } from 'chess.js';

import CustomChessboard from '../components/CustomChessboard';
import StatusPanel from '../components/StatusPanel';
import GameOverModal from '../components/GameOverModal';
import './GamePage.css';

function GamePage() {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [boardOrientation, setBoardOrientation] = useState('white');
  const [gameOverMessage, setGameOverMessage] = useState('');

  const legalMoves = useMemo(() =>
    selectedSquare ? game.moves({ square: selectedSquare, verbose: true }).map(m => m.to) : [],
    [game, selectedSquare]
  );
  
  const { whiteCaptures, blackCaptures, materialAdvantage } = useMemo(() => {
    const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9 };
    const startingPieceCount = { p: 8, n: 2, b: 2, r: 2, q: 1 };
    const currentPieceCount = { w: { p: 0, n: 0, b: 0, r: 0, q: 0 }, b: { p: 0, n: 0, b: 0, r: 0, q: 0 }};
    game.board().flat().forEach(piece => { if (piece) { currentPieceCount[piece.color][piece.type]++; } });
    let whiteMaterial = 0, blackMaterial = 0;
    for (const color of ['w', 'b']) {
      for (const type in pieceValues) {
        const count = currentPieceCount[color][type];
        if (color === 'w') whiteMaterial += count * pieceValues[type];
        else blackMaterial += count * pieceValues[type];
      }
    }
    const wc = [], bc = [];
    for (const type in startingPieceCount) {
      const missingWhite = startingPieceCount[type] - currentPieceCount.w[type];
      for (let i = 0; i < missingWhite; i++) { bc.push({ type, color: 'w' }); }
      const missingBlack = startingPieceCount[type] - currentPieceCount.b[type];
      for (let i = 0; i < missingBlack; i++) { wc.push({ type, color: 'b' }); }
    }
    return { whiteCaptures: wc, blackCaptures: bc, materialAdvantage: whiteMaterial - blackMaterial };
  }, [game]);
  
  function checkGameOver(gameInstance) {
    if (gameInstance.isGameOver()) {
      if (gameInstance.isCheckmate()) {
        const winner = gameInstance.turn() === 'w' ? 'Black' : 'White';
        setGameOverMessage(`${winner} wins by Checkmate!`);
      } else if (gameInstance.isStalemate()) {
        setGameOverMessage("Draw by Stalemate.");
      } else if (gameInstance.isThreefoldRepetition()) {
        setGameOverMessage("Draw by Threefold Repetition.");
      } else if (gameInstance.isInsufficientMaterial()) {
        setGameOverMessage("Draw by Insufficient Material.");
      } else {
        setGameOverMessage("Draw by the 50-move rule.");
      }
    }
  }

  function resetGame() {
    setGame(new Chess());
    setSelectedSquare(null);
    setGameOverMessage('');
    setBoardOrientation('white');
  }

  function flipBoard() {
    setBoardOrientation(current => (current === 'white' ? 'black' : 'white'));
  }

  function makeMove(move) {
    const gameCopy = new Chess();
    gameCopy.loadPgn(game.pgn());
    const result = gameCopy.move(move);

    if (result) {
      setGame(gameCopy);
      setBoardOrientation(gameCopy.turn() === 'w' ? 'white' : 'black');
      checkGameOver(gameCopy);
    }
    return result;
  }

  function handleSquareClick(square) {
    if (gameOverMessage) return;

    if (selectedSquare) {
      const pieceOnTarget = game.get(square);
      if (pieceOnTarget && pieceOnTarget.color === game.turn()) {
        setSelectedSquare(square);
        return;
      }
      const moveResult = makeMove({ from: selectedSquare, to: square, promotion: 'q' });
      setSelectedSquare(null);
    } else {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
      }
    }
  }

  function handleDragStart(square) {
    if (gameOverMessage) return;
    setSelectedSquare(square);
  }

  function handlePieceDrop(fromSquare, toSquare) {
    if (gameOverMessage) return;
    makeMove({ from: fromSquare, to: toSquare, promotion: 'q' });
    setSelectedSquare(null);
  }
  
  const isCheck = game.inCheck();
  const isWhiteTurn = game.turn() === 'w';
  const players = { white: { username: "You", rating: 1200 }, black: { username: "Opponent", rating: 1250 }};
  
  return (
    <div className="game-page">
      <GameOverModal message={gameOverMessage} onReset={resetGame} />
      <div className="board-container">
        <CustomChessboard
          board={game.board()}
          orientation={boardOrientation}
          onSquareClick={handleSquareClick}
          selectedSquare={selectedSquare}
          legalMoves={legalMoves}
          onPieceDrop={handlePieceDrop}
          onDragStart={handleDragStart}
        />
      </div>
      <StatusPanel 
        game={game}
        players={players}
        isWhiteTurn={isWhiteTurn}
        isCheck={isCheck}
        whiteCaptures={whiteCaptures} 
        blackCaptures={blackCaptures} 
        materialAdvantage={materialAdvantage}
        onReset={resetGame}
        onFlip={flipBoard}
        setGameOverMessage={setGameOverMessage}
      />
    </div>
  );
}

export default GamePage;