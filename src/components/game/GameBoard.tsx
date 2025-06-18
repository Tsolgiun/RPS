import { useState, useCallback } from 'react';
import { type Move, type GameState, type RoundState, determineWinner, getRandomMove, updateRoundState, createInitialRoundState } from './GameLogic';
import { PlayerSide } from './PlayerSide';
import { GameResult } from './GameResult';
import { RoundResult } from './RoundResult';

export function GameBoard() {
  const [gameState, setGameState] = useState<GameState>({
    playerMove: null,
    opponentMove: null,
    gameResult: null,
    isAnimating: false,
    isGameActive: false
  });

  const [roundState, setRoundState] = useState<RoundState>(createInitialRoundState());
  const [showResult, setShowResult] = useState(false);
  const [showRoundResult, setShowRoundResult] = useState(false);
  const [lastWinIndex, setLastWinIndex] = useState<{ player?: number; opponent?: number }>({});

  const resetGame = useCallback(() => {
    setGameState({
      playerMove: null,
      opponentMove: null,
      gameResult: null,
      isAnimating: false,
      isGameActive: false
    });
    setShowResult(false);
    setShowRoundResult(false);
  }, []);

  const resetMatch = useCallback(() => {
    setRoundState(createInitialRoundState());
    setLastWinIndex({});
    resetGame();
  }, [resetGame]);

  const handlePlayerMove = useCallback((move: Move) => {
    if (gameState.isGameActive || gameState.playerMove) return;

    setGameState(prev => ({
      ...prev,
      playerMove: move,
      isGameActive: true
    }));

    // Simulate opponent thinking time
    setTimeout(() => {
      const opponentMove = getRandomMove();
      const result = determineWinner(move, opponentMove);

      setGameState(prev => ({
        ...prev,
        opponentMove,
        gameResult: result,
        isAnimating: true
      }));

      // Update round state and win counters
      const newRoundState = updateRoundState(roundState, result);
      setRoundState(newRoundState);

      // Track which marker was just filled for animation
      if (result === 'player') {
        setLastWinIndex({ player: newRoundState.playerWins - 1 });
      } else if (result === 'opponent') {
        setLastWinIndex({ opponent: newRoundState.opponentWins - 1 });
      }

      // Show result overlay after animation starts
      setTimeout(() => {
        if (newRoundState.isGameComplete) {
          // Game is complete - show final result
          setShowResult(true);
        } else {
          // Show round result with countdown for all cases (win/loss/tie)
          setShowRoundResult(true);
        }
      }, 400);

      // For final game result, auto-reset after longer delay
      if (newRoundState.isGameComplete) {
        setTimeout(() => {
          resetMatch();
        }, 5000);
      }
    }, 1000);
  }, [gameState.isGameActive, gameState.playerMove, resetGame, roundState]);

  const handleResultClose = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const handleRoundCountdownComplete = useCallback(() => {
    setShowRoundResult(false);
    resetGame();
  }, [resetGame]);

  return (
    <div className="game-board">
      <PlayerSide
        side="player"
        selectedMove={gameState.playerMove}
        onMoveSelect={handlePlayerMove}
        disabled={gameState.isGameActive}
        gameResult={gameState.gameResult}
        isAnimating={gameState.isAnimating}
        wins={roundState.playerWins}
        lastWinIndex={lastWinIndex.player}
      />
      
      <PlayerSide
        side="opponent"
        selectedMove={gameState.opponentMove}
        onMoveSelect={() => {}} // Opponent doesn't select manually
        disabled={true}
        gameResult={gameState.gameResult}
        isAnimating={gameState.isAnimating}
        wins={roundState.opponentWins}
        lastWinIndex={lastWinIndex.opponent}
      />

      <RoundResult
        result={gameState.gameResult}
        playerWins={roundState.playerWins}
        opponentWins={roundState.opponentWins}
        isVisible={showRoundResult}
        onCountdownComplete={handleRoundCountdownComplete}
      />

      <GameResult
        result={gameState.gameResult}
        isVisible={showResult}
        onClose={handleResultClose}
      />
    </div>
  );
}
