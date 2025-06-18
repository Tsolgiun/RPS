import { useState, useEffect } from 'react';
import { type GameResult } from './GameLogic';

interface RoundResultProps {
  result: GameResult | null;
  playerWins: number;
  opponentWins: number;
  isVisible: boolean;
  onCountdownComplete: () => void;
}

export function RoundResult({ result, playerWins, opponentWins, isVisible, onCountdownComplete }: RoundResultProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!isVisible || !result) {
      setCountdown(3);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onCountdownComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, result, onCountdownComplete]);

  if (!result || !isVisible) {
    return null;
  }

  const getRoundMessage = (result: GameResult): string => {
    switch (result) {
      case 'player': return 'White wins the round';
      case 'opponent': return 'Black wins the round';
      case 'tie': return "It's a tie!";
      default: return '';
    }
  };

  return (
    <div className="round-result-overlay">
      <div className="round-result-content">
        <h2 className="round-result-message">{getRoundMessage(result)}</h2>
        <div className="round-result-score">
          White: {playerWins} | Black: {opponentWins}
        </div>
        <div className="round-result-countdown">
          Next round in {countdown}...
        </div>
      </div>
    </div>
  );
}
