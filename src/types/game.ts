export type GamePhase = 'title' | 'onboarding-concepts' | 'concept-quiz' | 'onboarding-commands' | 'loading' | 'story-intro' | 'game' | 'success';

export type ZoneType = 'working' | 'staging' | 'local' | 'remote';

export interface QuizStep {
  id: number;
  scenario: string;
  currentVisualState: 'initial' | 'modified' | 'staged' | 'committed' | 'pushed' | 'remote-update';
  correctCommand: string;
  options: string[];
  feedback: {
    success: string;
    error: string;
  };
}

export interface GameState {
  currentPhase: GamePhase;
  currentStepId: number;
  completedSteps: number[];
  commitMessage: string | null;
  setCommitMessage: (msg: string) => void;
  setPhase: (phase: GamePhase) => void;
  submitCommand: (command: string) => void;
  nextStep: () => void;
}
