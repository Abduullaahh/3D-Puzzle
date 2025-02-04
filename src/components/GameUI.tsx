import React from 'react';
import { Timer, Trophy, Pause, Play, HelpCircle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const GameUI: React.FC = () => {
  const { score, timeElapsed, isPaused, isPlaying, isSolved, pauseGame, resumeGame } = useGameStore();
  const [showHelp, setShowHelp] = React.useState(false);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isPlaying) return null;

  return (
    <>
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent text-white backdrop-blur-sm">
        <div className="flex items-center space-x-8">
          <div className="flex items-center bg-black/30 rounded-lg px-4 py-2">
            <Timer className="w-5 h-5 mr-3 text-blue-400" />
            <span className="text-2xl font-bold font-mono">{formatTime(timeElapsed)}</span>
          </div>
          <div className="flex items-center bg-black/30 rounded-lg px-4 py-2">
            <Trophy className="w-5 h-5 mr-3 text-yellow-400" />
            <span className="text-2xl font-bold font-mono">{score}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowHelp(true)}
            className="p-3 rounded-full hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
            title="Help"
          >
            <HelpCircle className="w-6 h-6 text-blue-400" />
          </button>
          <button
            onClick={() => (isPaused ? resumeGame() : pauseGame())}
            className="p-3 rounded-full hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? 
              <Play className="w-6 h-6 text-green-400" /> : 
              <Pause className="w-6 h-6 text-orange-400" />
            }
          </button>
        </div>
      </div>

      {showHelp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50" onClick={() => setShowHelp(false)}>
          <div 
            className="bg-white/95 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl transform transition-all"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">How to Play</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Goal</h3>
                <p className="text-gray-700">Solve the Rubik's cube by aligning all colors on each face.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Controls</h3>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>Click and drag to rotate the entire cube view</li>
                  <li>Click on any face to rotate that layer</li>
                  <li>The rotation direction depends on where you click on the face</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Scoring</h3>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>Start with potential 1000 points</li>
                  <li>Lose 10 points per move</li>
                  <li>Bonus 5000 points for solving the puzzle</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Difficulty Levels</h3>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>Easy: 2×2×2 cube</li>
                  <li>Medium: 3×3×3 cube</li>
                  <li>Hard: 4×4×4 cube</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-8 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold
                       transform transition-transform hover:scale-105 active:scale-95"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {isSolved && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-white/95 rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl transform animate-bounce-once">
            <div className="mb-6">
              <Trophy className="w-20 h-20 mx-auto text-yellow-400 animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Congratulations!</h2>
            <p className="text-xl mb-4 text-gray-700">You solved the puzzle!</p>
            <p className="text-3xl font-bold mb-8 text-blue-600">Final Score: {score}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg 
                       hover:from-blue-700 hover:to-blue-800 transition-all font-bold text-lg
                       transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};