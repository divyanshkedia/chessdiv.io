import React from 'react';
import PlayerPod from './PlayerPod';
import MoveHistory from './MoveHistory';
import ActionBar from './ActionBar';
import './StatusPanel.css';

function StatusPanel({ 
  game, players, isWhiteTurn, isCheck, 
  whiteCaptures, blackCaptures, materialAdvantage, 
  onReset, onFlip, setGameOverMessage 
}) {
  return (
    <div className="status-panel">
      <PlayerPod 
        player={players.black} 
        playerColor='b'
        time="5:00" 
        isActive={!isWhiteTurn} 
        captures={blackCaptures}
        advantage={materialAdvantage < 0 ? -materialAdvantage : 0}
      />
      
      <div className="panel-center-section">
        {isCheck && !game.isGameOver() && <div className="check-indicator">Check!</div>}
        <MoveHistory history={game.history()} />
      </div>
      
      <PlayerPod 
        player={players.white} 
        playerColor='w'
        time="5:00" 
        isActive={isWhiteTurn} 
        captures={whiteCaptures}
        advantage={materialAdvantage > 0 ? materialAdvantage : 0}
      />
      
      <ActionBar 
        onReset={onReset} 
        onFlip={onFlip} 
        isWhiteTurn={isWhiteTurn} 
        setGameOverMessage={setGameOverMessage}
      />
    </div>
  );
}

export default StatusPanel;