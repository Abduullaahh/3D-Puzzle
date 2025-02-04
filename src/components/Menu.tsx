import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Difficulty } from '../types/game';
import { Puzzle } from 'lucide-react';

export const Menu: React.FC = () => {
  const { isPlaying, startGame } = useGameStore();

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  if (isPlaying) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-black">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 max-w-md w-full mx-4 shadow-2xl border border-white/20">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-600/20 p-4 rounded-2xl">
            <Puzzle className="w-16 h-16 text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-center text-white mb-2">3D Puzzle</h1>
        <p className="text-center text-blue-200 mb-8">Choose your difficulty level</p>
        <div className="space-y-4">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => startGame(diff)}
              className="w-full py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300
                       bg-gradient-to-r from-blue-600 to-blue-700 text-white
                       hover:from-blue-700 hover:to-blue-800
                       transform hover:scale-105 active:scale-95
                       shadow-lg hover:shadow-xl
                       capitalize flex items-center justify-center space-x-2"
            >
              <span>{diff} Mode</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};