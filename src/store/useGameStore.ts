import { create } from 'zustand';
import type { GameState, GamePhase } from '../types/game';

export const useGameStore = create<GameState>((set) => ({
  currentPhase: 'title',
  currentStepId: 0,
  completedSteps: [],
  commitMessage: null,
  setCommitMessage: (msg) => set({ commitMessage: msg }),
  setPhase: (phase: GamePhase) => set({ currentPhase: phase }),
  submitCommand: (command: string) => {
      // For now, valid logic is handled in ControlArea, but we can track history here
      console.log(`Command submitted: ${command}`);
  },
  nextStep: () => set((state) => ({ currentStepId: state.currentStepId + 1 })),
}));
