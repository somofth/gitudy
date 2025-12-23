import { useEffect } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { useGameStore } from './store/useGameStore';
import { OnboardingCarousel } from './components/onboarding/OnboardingCarousel';
import { ConceptQuiz } from './components/onboarding/ConceptQuiz';
import { GameLayout } from './components/game/GameLayout';
import { LoadingScreen } from './components/LoadingScreen';

import { StoryIntro } from './components/StoryIntro';

function App() {
  const { currentPhase, setPhase } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'X' || e.key === 'x')) {
        setPhase('loading');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setPhase]);

  return (
    <div className="w-full h-[100dvh] bg-gray-900 text-white overflow-hidden">
      {currentPhase === 'title' && <TitleScreen />}
      {(currentPhase === 'onboarding-concepts' || currentPhase === 'onboarding-commands') && (
        <OnboardingCarousel phase={currentPhase} />
      )}
      {currentPhase === 'concept-quiz' && <ConceptQuiz />}
      {currentPhase === 'loading' && <LoadingScreen />}
      {currentPhase === 'story-intro' && <StoryIntro />}
      {currentPhase === 'game' && <GameLayout />}
    </div>
  );
}

export default App;
