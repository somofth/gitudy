import { TitleScreen } from './components/TitleScreen';
import { useGameStore } from './store/useGameStore';
import { OnboardingCarousel } from './components/onboarding/OnboardingCarousel';
import { ConceptQuiz } from './components/onboarding/ConceptQuiz';
import { GameLayout } from './components/game/GameLayout';

function App() {
  const currentPhase = useGameStore((state) => state.currentPhase);

  return (
    <div className="min-h-screen bg-black">
      {currentPhase === 'title' && <TitleScreen />}
      {currentPhase === 'onboarding-concepts' && <OnboardingCarousel phase="onboarding-concepts" />}
      {currentPhase === 'concept-quiz' && <ConceptQuiz />}
      {currentPhase === 'onboarding-commands' && <OnboardingCarousel phase="onboarding-commands" />}
      {currentPhase === 'game' && <GameLayout />}
    </div>
  );
}

export default App;
