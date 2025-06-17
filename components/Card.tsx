"use client";

import React from "react";

type Props = {
  value: number | string;
  isFlipped: boolean;
  onClick: () => void;
  gameType?: "numbers" | "colors" | "symbols";
};

const Card = ({ value, isFlipped, onClick, gameType = "numbers" }: Props) => {
  return (
    <div className="w-16 h-16 perspective cursor-pointer" onClick={onClick}>
      <div
        className={`relative w-full h-full duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : "rotate-y-0"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute w-full h-full backface-hidden bg-gray-300 border-2 rounded flex items-center justify-center text-black text-xl font-bold">
          ?
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-300 border-2 rounded flex items-center justify-center text-xl font-bold">
          {gameType === "numbers" || gameType === "symbols" ? (
            value
          ) : (
            <div
              style={{
                width: "80%",
                height: "80%",
                backgroundColor: value as string,
                borderRadius: "6px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;