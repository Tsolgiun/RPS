export type Move = 'rock' | 'paper' | 'scissors';
export type GameResult = 'player' | 'opponent' | 'tie';

export interface GameState {
  playerMove: Move | null;
  opponentMove: Move | null;
  gameResult: GameResult | null;
  isAnimating: boolean;
  isGameActive: boolean;
}

export interface RoundState {
  playerWins: number;
  opponentWins: number;
  currentRound: number;
  gameWinner: 'player' | 'opponent' | null;
  isGameComplete: boolean;
}

export const moves: Move[] = ['rock', 'paper', 'scissors'];

export const getMoveIcon = (move: Move): string => {
  switch (move) {
    case 'rock': return '✊';
    case 'paper': return '✋';
    case 'scissors': return '✌️';
    default: return '';
  }
};

export const getMoveLabel = (move: Move): string => {
  switch (move) {
    case 'rock': return 'Rock';
    case 'paper': return 'Paper';
    case 'scissors': return 'Scissors';
    default: return '';
  }
};

export const determineWinner = (playerMove: Move, opponentMove: Move): GameResult => {
  if (playerMove === opponentMove) {
    return 'tie';
  }
  
  const winConditions: Record<Move, Move> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };
  
  return winConditions[playerMove] === opponentMove ? 'player' : 'opponent';
};

export const getRandomMove = (): Move => {
  return moves[Math.floor(Math.random() * moves.length)];
};

export const getResultMessage = (result: GameResult): string => {
  switch (result) {
    case 'player': return 'White Wins!';
    case 'opponent': return 'Black Wins!';
    case 'tie': return "It's a Tie!";
    default: return '';
  }
};

export const updateRoundState = (currentState: RoundState, roundResult: GameResult): RoundState => {
  if (roundResult === 'tie') {
    return { ...currentState, currentRound: currentState.currentRound + 1 };
  }

  const newState = { ...currentState };
  
  if (roundResult === 'player') {
    newState.playerWins++;
  } else if (roundResult === 'opponent') {
    newState.opponentWins++;
  }
  
  newState.currentRound++;
  
  // Check for match completion (first to 3 wins)
  if (newState.playerWins >= 3) {
    newState.gameWinner = 'player';
    newState.isGameComplete = true;
  } else if (newState.opponentWins >= 3) {
    newState.gameWinner = 'opponent';
    newState.isGameComplete = true;
  }
  
  return newState;
};

export const createInitialRoundState = (): RoundState => ({
  playerWins: 0,
  opponentWins: 0,
  currentRound: 1,
  gameWinner: null,
  isGameComplete: false
});

export const getMatchResultMessage = (winner: 'player' | 'opponent'): string => {
  return winner === 'player' ? 'White Wins the Match!' : 'Black Wins the Match!';
};
