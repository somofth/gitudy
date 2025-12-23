import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Github } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const { setPhase } = useGameStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('story-intro');
    }, 2000);

    return () => clearTimeout(timer);
  }, [setPhase]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100dvh] bg-gray-900 text-white">
      <motion.div
        animate={{ y: [-20, 0, -20] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-8"
      >
        <Github size={80} className="text-white" />
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-blue-400"
      >
        게임 로딩 중...
      </motion.h2>
    </div>
  );
};
