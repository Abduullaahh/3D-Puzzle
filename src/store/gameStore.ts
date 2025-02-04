import { create } from 'zustand';
import { GameState, Difficulty } from '../types/game';

export const useGameStore = create<GameState>((set) => ({
  difficulty: 'easy',
  isPlaying: false,
  score: 0,
  timeElapsed: 0,
  isPaused: false,
  isSolved: false,

  startGame: (difficulty: Difficulty) =>
    set({ difficulty, isPlaying: true, score: 0, timeElapsed: 0, isPaused: false, isSolved: false }),

  pauseGame: () => set({ isPaused: true }),

  resumeGame: () => set({ isPaused: false }),

  endGame: () => set({ isPlaying: false }),

  updateScore: (points: number) =>
    set((state) => ({ score: state.score + points })),

  updateTime: (time: number) =>
    set({ timeElapsed: time }),

  setSolved: (solved: boolean) =>
    set({ isSolved: solved }),
}));