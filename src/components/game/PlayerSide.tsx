import { type Move, type GameResult, moves, getMoveIcon } from './GameLogic';
import { MoveButton } from './MoveButton';
import { WinCounter } from './WinCounter';

interface PlayerSideProps {
  side: 'player' | 'opponent';
  selectedMove: Move | null;
  onMoveSelect: (move: Move) => void;
  disabled: boolean;
  gameResult: GameResult | null;
  isAnimating: boolean;
  wins: number;
  lastWinIndex?: number;
}

export function PlayerSide({ 
  side, 
  selectedMove, 
  onMoveSelect, 
  disabled, 
  gameResult, 
  isAnimating,
  wins,
  lastWinIndex
}: PlayerSideProps) {
  const isPlayer = side === 'player';
  const theme = isPlayer ? 'light' : 'dark';
  const label = isPlayer ? 'White' : 'Black';
  
  // Determine if this side won
  const didWin = gameResult === side;
  const didLose = gameResult && gameResult !== 'tie' && gameResult !== side;

  return (
    <div className={`player-side player-side--${theme} ${isAnimating && didWin ? 'player-side--winner' : ''} ${isAnimating && didLose ? 'player-side--loser' : ''}`}>
      <WinCounter
        wins={wins}
        maxWins={3}
        theme={theme}
        lastWinIndex={lastWinIndex}
      />
      
      <div className="player-info">
        <h2 className="player-label">{label}</h2>
        {selectedMove && (
          <div className="selected-move">
            <span className="selected-move-icon">{getMoveIcon(selectedMove)}</span>
            <span className="selected-move-label">{selectedMove.charAt(0).toUpperCase() + selectedMove.slice(1)}</span>
          </div>
        )}
      </div>
      
      {isPlayer && (
        <div className="move-buttons">
          {moves.map((move) => (
            <MoveButton
              key={move}
              move={move}
              onClick={onMoveSelect}
              disabled={disabled}
              isSelected={selectedMove === move}
              theme={theme}
            />
          ))}
        </div>
      )}
      
      {!isPlayer && !selectedMove && (
        <div className="waiting-indicator">
          <span className="waiting-text">Waiting...</span>
        </div>
      )}
    </div>
  );
}
