import GameBoard from "../../components/GameBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Pexeso</h1>
      <GameBoard />
    </main>
  );
}