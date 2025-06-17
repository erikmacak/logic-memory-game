type Props = {
  attempts: number;
  pairsLeft: number;
};

const ScoreBoard = ({ attempts, pairsLeft }: Props) => {
  return (
    <div className="mb-2">
      <p>Pokusy: {attempts}</p>
      <p>Zbývá párů: {pairsLeft}</p>
    </div>
  );
};

export default ScoreBoard;