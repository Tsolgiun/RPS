import { type GameResult, getResultMessage } from './GameLogic';

interface GameResultProps {
  result: GameResult | null;
  isVisible: boolean;
  onClose: () => void;
}

export function GameResult({ result, isVisible, onClose }: GameResultProps) {
  if (!result || !isVisible) {
    return null;
  }

  return (
    <div className="game-result-overlay" onClick={onClose}>
      <div className="game-result-content">
        <h2 className="game-result-message">{getResultMessage(result)}</h2>
        <p className="game-result-subtitle">Click to play again</p>
      </div>
    </div>
  );
}
