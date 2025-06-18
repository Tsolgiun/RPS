import { type Move, getMoveIcon, getMoveLabel } from './GameLogic';

interface MoveButtonProps {
  move: Move;
  onClick: (move: Move) => void;
  disabled: boolean;
  isSelected: boolean;
  theme: 'light' | 'dark';
}

export function MoveButton({ move, onClick, disabled, isSelected, theme }: MoveButtonProps) {
  const handleClick = () => {
    if (!disabled) {
      onClick(move);
    }
  };

  return (
    <button
      className={`move-button move-button--${theme} ${isSelected ? 'move-button--selected' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={getMoveLabel(move)}
    >
      <span className="move-icon">{getMoveIcon(move)}</span>
      <span className="move-label">{getMoveLabel(move)}</span>
    </button>
  );
}
