interface WinCounterProps {
  wins: number;
  maxWins: number;
  theme: 'light' | 'dark';
  lastWinIndex?: number;
}

export function WinCounter({ wins, maxWins, theme, lastWinIndex }: WinCounterProps) {
  return (
    <div className={`win-counter win-counter--${theme}`}>
      {Array.from({ length: maxWins }, (_, index) => (
        <div
          key={index}
          className={`win-marker ${
            index < wins ? 'win-marker--filled' : 'win-marker--empty'
          } ${
            lastWinIndex === index ? 'win-marker--new' : ''
          }`}
        />
      ))}
    </div>
  );
}
