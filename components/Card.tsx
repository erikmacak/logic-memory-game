"use client";

type Props = {
  value: number | string;
  isFlipped: boolean;
  onClick: () => void;
  gameType?: "numbers" | "colors";
};

const Card = ({ value, isFlipped, onClick, gameType = "numbers" }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`w-16 h-16 flex items-center justify-center border-2 rounded cursor-pointer text-xl font-bold ${
        isFlipped ? "bg-blue-300" : "bg-gray-300"
      }`}
    >
      {isFlipped ? (
        gameType === "numbers" ? (
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
        )
      ) : (
        <span style={{ color: "black", fontWeight: "bold" }}>?</span>
      )}
    </div>
  );
};

export default Card;