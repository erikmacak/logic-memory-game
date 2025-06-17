"use client";

type Props = {
  setGameType: (type: "numbers" | "colors") => void;
  startNewGame: () => void;
  setDifficulty: (level: "easy" | "medium" | "hard") => void;
};

const Controls = ({ setGameType, startNewGame, setDifficulty }: Props) => {
  return (
    <div className="flex gap-4 mb-4">
      <select
        onChange={(e) => setGameType(e.target.value as any)}
        className="border p-1 rounded"
      >
        <option value="numbers">Čísla</option>
        <option value="colors">Barvy</option>
      </select>

      <select
        onChange={(e) => setDifficulty(e.target.value as any)}
        className="border p-1 rounded"
      >
        <option value="easy">Lehká</option>
        <option value="medium">Střední</option>
        <option value="hard">Těžká</option>
      </select>

      <button
        onClick={startNewGame}
        className="bg-green-500 px-4 py-1 rounded text-white"
      >
        Nová hra
      </button>
    </div>
  );
};

export default Controls;