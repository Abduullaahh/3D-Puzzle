export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  difficulty: Difficulty;
  isPlaying: boolean;
  score: number;
  timeElapsed: number;
  isPaused: boolean;
  isSolved: boolean;
  startGame: (difficulty: Difficulty) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  updateScore: (points: number) => void;
  updateTime: (time: number) => void;
  setSolved: (solved: boolean) => void;
}