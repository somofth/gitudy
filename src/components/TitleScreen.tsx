import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { ArrowRight, Github } from 'lucide-react';

export const TitleScreen: React.FC = () => {
  const { setPhase } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100dvh] bg-gray-900 text-white p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center flex flex-col items-center gap-4"
        >
          <Github size={80} className="text-white mb-4" />
          <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
            GitHub
          </span>
          <span className="text-2xl md:text-4xl font-bold text-gray-300">
            게임으로 배우기
          </span>
        </motion.div>
      </div>

      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setPhase('onboarding-concepts')}
        className="z-10 group relative w-full max-w-sm px-8 py-5 bg-white text-gray-900 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-8"
      >
        <span>바로 시작하기</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full ring-2 ring-white/50 animate-pulse"></div>
      </motion.button>
    </div>
  );
};
