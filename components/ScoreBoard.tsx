type Props = {
  attempts: number;
  pairsLeft: number;
  time: number;
};

const ScoreBoard = ({ attempts, pairsLeft, time }: Props) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="mb-2">
      <p>Pokusy: {attempts}</p>
      <p>Zbývá párů: {pairsLeft}</p>
      <p>Čas: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
    </div>
  );
};

export default ScoreBoard;