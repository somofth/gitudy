import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { onboardingConcepts, onboardingCommands } from '../../data/onboardingData';


interface Props {
  phase: 'onboarding-concepts' | 'onboarding-commands';
}

export const OnboardingCarousel: React.FC<Props> = ({ phase }) => {
  const { setPhase } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = phase === 'onboarding-concepts' ? onboardingConcepts : onboardingCommands;

  // Reset index when phase changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [phase]);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of carousel logic
      if (phase === 'onboarding-concepts') {
        setPhase('concept-quiz');
      } else {
        setPhase('loading');
      }
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slide = slides[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 overflow-hidden relative">
      {/* progress indicator */}
      <div className="absolute top-8 w-full max-w-md px-6">
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
             <motion.div 
               initial={false}
               animate={{ 
                 width: `${((currentIndex + 1) / slides.length) * 100}%`
               }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
               className="h-full bg-blue-500" 
             />
          </div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full max-w-md mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 px-5 py-8 rounded-2xl shadow-2xl flex flex-col items-center text-center w-full min-h-[400px] border border-gray-700"
          >
            {slide.image ? (
               <img 
                 src={slide.image} 
                 alt={slide.title} 
                 className="w-full max-w-[200px] h-40 object-cover rounded-lg mb-6 border border-gray-700 shadow-md" 
               />
            ) : (
               <div className="text-6xl mb-6">{slide.icon}</div>
            )}
            {slide.command && (
              <div className="bg-black/30 px-3 py-1 rounded text-green-400 font-mono text-xl mb-4">
                {slide.command}
              </div>
            )}
            <h2 className="text-2xl font-bold mb-3 text-blue-400">{slide.title}</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-left w-full px-4">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md flex justify-between items-center mt-8 pb-8">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full flex items-center justify-center transition-colors ${
            currentIndex === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-700'
          }`}
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors bg-blue-600 hover:bg-blue-500"
        >
          {currentIndex === slides.length - 1 ? (
             <span className="flex items-center gap-1 font-bold text-sm px-2">
               {phase === 'onboarding-concepts' ? 'Take Quiz' : 'Start Game'} 
               <ChevronRight size={16}/>
             </span>
          ) : (
            <ChevronRight size={32} />
          )}
        </button>
      </div>
    </div>
  );
};

