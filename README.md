# 🧠 Logic Memory Game (Pexeso)

This is a small school project created to test our knowledge of **React** using **Next.js**.  
The result is a simple memory game (Pexeso), where players flip cards to find matching pairs.

The application's interface is in **Czech**, but all commits and pull requests are written in **English**.

🔗 **Live demo:**  
[https://vercel.com/erik-macaks-projects/logic-memory-game](https://vercel.com/erik-macaks-projects/logic-memory-game)

> ⚠️ **Note:** The UI was designed and tested on a **laptop screen**. It may not be fully responsive on mobile or tablet devices.

---

## 🎮 Features

- Flip two cards at a time:
  - ✅ If they match, they stay flipped.
  - ❌ If not, they flip back after a short delay.
- Game ends when all pairs are matched.
- "New Game" button shuffles the cards and restarts the game.
- Display of:
  - Number of attempts
  - Remaining unmatched pairs
- Game type selector:
  - 🔢 Numbers
  - 🎨 Colors
  - 😄 Symbols (emojis)
- Timer to track game duration.
- Difficulty levels:
  - 🟢 Easy
  - 🟡 Medium
  - 🔴 Hard (more pairs)
- Best times stored per game type and difficulty (using `localStorage`).

---

## ⚙️ Getting Started

To run the project locally, follow these steps:

### 1. Clone the repository

git clone https://github.com/erikmacak/logic-memory-game.git
cd logic-memory-game

### 2. Install dependencies

npm install
# or
yarn
# or
pnpm install
# or
bun install

### 3. Start the development server

npm run dev

Visit http://localhost:3000 in your browser to see the app running.

## 🧱 Built With
-Next.js
-React
-TypeScript
-localStorage for best time tracking
