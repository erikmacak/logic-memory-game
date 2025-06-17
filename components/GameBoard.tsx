"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";

type CardType = {
  id: number;
  value: number | string;
};

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080", 
];

const GameBoard = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [pairsLeft, setPairsLeft] = useState(8);
  const [gameType, setGameType] = useState<"numbers" | "colors">("numbers");
  const [time, setTime] = useState(0);

  const generateNumberCards = (): CardType[] => {
    const values = Array.from({ length: 8 }, (_, i) => i + 1);
    const pairs = [...values, ...values];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    return shuffled.map((value, i) => ({ id: i, value }));
  };

  const generateColorCards = (): CardType[] => {
    const pairs = [...colors, ...colors];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    return shuffled.map((color, i) => ({ id: i, value: color }));
  };

  const startNewGame = () => {
    let newCards: CardType[] = [];
    if (gameType === "numbers") {
      newCards = generateNumberCards();
    } else if (gameType === "colors") {
      newCards = generateColorCards();
    }
    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setPairsLeft(8);
    setTime(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (pairsLeft > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pairsLeft]);

  useEffect(() => {
    startNewGame();
  }, [gameType]);

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
      <Controls setGameType={setGameType} startNewGame={startNewGame} />
      <ScoreBoard attempts={attempts} pairsLeft={pairsLeft} time={time} />

      <div className="grid grid-cols-4 gap-4 mt-4">
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