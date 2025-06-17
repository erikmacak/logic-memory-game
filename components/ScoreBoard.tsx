type Props = {
  attempts: number;
  pairsLeft: number;
  time: number;
  bestTime?: number;
};

const ScoreBoard = ({ attempts, pairsLeft, time, bestTime}: Props) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const bestMinutes = bestTime ? Math.floor(bestTime / 60) : 0;
  const bestSeconds = bestTime ? bestTime % 60 : 0;

  return (
    <div className="mb-2">
      <p>Pokusy: {attempts}</p>
      <p>Zbývá párů: {pairsLeft}</p>
      <p>Čas: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
      {bestTime !== undefined && (
        <p>Nejlepší čas: {bestMinutes}:{bestSeconds < 10 ? `0${bestSeconds}` : bestSeconds}</p>
      )}
    </div>
  );
};

export default ScoreBoard;