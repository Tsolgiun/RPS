import { GameBoard } from './game/GameBoard';
import './game/game.css';

export function Home() {
  return (
    <div className="game-container">
      <div className="game-panel">
        <GameBoard />
      </div>
    </div>
  );
}
