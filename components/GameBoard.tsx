"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";

type CardType = {
  id: number;
  value: number | string;
};

type BestTimes = {
  [key: string]: number;
};

const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF",
  "#00FFFF", "#FFA500", "#800080", "#A52A2A", "#008080",
];

const symbols = ["★", "♥", "☂", "♣", "♠", "✈", "♫", "☀", "⚽", "🍀"];

const GameBoard = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [pairsLeft, setPairsLeft] = useState(8);
  const [gameType, setGameType] = useState<"numbers" | "colors" | "symbols">("numbers");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [time, setTime] = useState(0);
  const [bestTimes, setBestTimes] = useState<BestTimes>({});

  const getKey = () => `${gameType}-${difficulty}`;

  const getPairsCount = () => {
    switch (difficulty) {
      case "easy": return 6;
      case "medium": return 8;
      case "hard": return 10;
      default: return 8;
    }
  };

  const generateNumberCards = (): CardType[] => {
    const pairsCount = getPairsCount();
    const values = Array.from({ length: pairsCount }, (_, i) => i + 1);
    const pairs = [...values, ...values];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    return shuffled.map((value, i) => ({ id: i, value }));
  };

  const generateColorCards = (): CardType[] => {
    const pairsCount = getPairsCount();
    const selectedColors = colors.slice(0, pairsCount);
    const pairs = [...selectedColors, ...selectedColors];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    return shuffled.map((color, i) => ({ id: i, value: color }));
  };

  const generateSymbolCards = (): CardType[] => {
    const pairsCount = getPairsCount();
    const selectedSymbols = symbols.slice(0, pairsCount);
    const pairs = [...selectedSymbols, ...selectedSymbols];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    return shuffled.map((symbol, i) => ({ id: i, value: symbol }));
  };

  const loadBestTimes = () => {
    const stored = localStorage.getItem("bestTimes");
    if (stored) {
      setBestTimes(JSON.parse(stored));
    }
  };

  const updateBestTime = () => {
    const key = getKey();
    const currentBest = bestTimes[key];
    if (!currentBest || time < currentBest) {
      const updated = { ...bestTimes, [key]: time };
      setBestTimes(updated);
      localStorage.setItem("bestTimes", JSON.stringify(updated));
    }
  };

  const startNewGame = () => {
    let newCards: CardType[] = [];
    if (gameType === "numbers") {
      newCards = generateNumberCards();
    } else if (gameType === "colors") {
      newCards = generateColorCards();
    } else if (gameType === "symbols") {
      newCards = generateSymbolCards();
    }
    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setPairsLeft(getPairsCount());
    setTime(0);
  };

  useEffect(() => {
    loadBestTimes();
  }, []);

  useEffect(() => {
    startNewGame();
  }, [gameType, difficulty]);

  useEffect(() => {
    if (pairsLeft === 0) {
      updateBestTime();
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [pairsLeft]);

  const handleCardClick = (index: number) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts((prev) => prev + 1);
      const [i1, i2] = newFlipped;
      const isMatch = cards[i1].value === cards[i2].value;

      setTimeout(() => {
        if (isMatch) {
          setMatched((prev) => [...prev, i1, i2]);
          setPairsLeft((prev) => prev - 1);
        }
        setFlipped([]);
      }, 1000);
    }
  };

  return (
    <div className="p-4">
      <Controls
        setGameType={setGameType}
        startNewGame={startNewGame}
        setDifficulty={setDifficulty}
      />
      <ScoreBoard
        attempts={attempts}
        pairsLeft={pairsLeft}
        time={time}
        bestTime={bestTimes[getKey()]}
      />
      <div className={`grid gap-4 mt-4 ${difficulty === "hard" ? "grid-cols-5" : "grid-cols-4"}`}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={flipped.includes(index) || matched.includes(index)}
            onClick={() => handleCardClick(index)}
            gameType={gameType}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;