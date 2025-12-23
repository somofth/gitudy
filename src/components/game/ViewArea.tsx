import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { quizSteps } from '../../data/quizData';
import { Home, Box, Archive, Cloud, Lock } from 'lucide-react';

const activeStyle = (isActive: boolean) => 
  isActive 
    ? "opacity-100 scale-105 border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
    : "opacity-40 grayscale scale-95 border-gray-700";

export const ViewArea: React.FC = () => {
  const { currentStepId } = useGameStore();
  
  // Find current step data (safe access)
  const stepIndex = Math.min(currentStepId, quizSteps.length - 1);
  const step = quizSteps[stepIndex];
  
  const visualState = step.currentVisualState;

  // Visual Logic: Which zones are "Active" (Lit up)?
  const isWorkingActive = visualState !== 'initial';
  const isStagingActive = ['staged', 'committed', 'pushed'].includes(visualState);
  const isLocalActive = ['committed', 'pushed'].includes(visualState);
  const isRemoteActive = ['pushed', 'remote-update'].includes(visualState);

  // File Position Logic
  const showFileInWorking = visualState === 'modified' || visualState === 'remote-update'; 
  const showFileInStaging = visualState === 'staged';
  const showFileInLocal = visualState === 'committed';
  const showFileInRemote = visualState === 'remote-update'; 

  // Get commit message for display
  const { commitMessage } = useGameStore();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-2 bg-gray-900 relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-6xl h-auto min-h-[40vh]">
        
        {/* Working Directory */}
        <Zone 
          title="작업 공간" 
          icon={<Home size={40} />}
          color="border-red-500 bg-red-900/10"
          isActive={isWorkingActive}
        >
           {visualState === 'initial' && <Lock className="text-gray-500 mb-2" />}
           <AnimatePresence>
             {showFileInWorking && (
               <GameFile label="index.html" color="bg-red-500" />
             )}
           </AnimatePresence>
        </Zone>

        {/* Staging Area */}
        <Zone 
          title="임시 저장" 
          icon={<Box size={40} />}
          color="border-green-500 bg-green-900/10"
          isActive={isStagingActive}
        >
          <AnimatePresence>
            {showFileInStaging && (
              <GameFile label="index.html" color="bg-green-500" icon="📦" />
            )}
          </AnimatePresence>
        </Zone>

        {/* Local Repository */}
        <Zone 
          title="로컬 저장소" 
          icon={<Archive size={40} />}
          color="border-blue-500 bg-blue-900/10"
          isActive={isLocalActive}
        >
          <AnimatePresence>
            {showFileInLocal && (
              <GameFile label={commitMessage || "Version 1"} color="bg-blue-500" icon="🗳️" />
            )}
          </AnimatePresence>
        </Zone>

        {/* Remote Repository */}
        <Zone 
          title="원격 저장소" 
          icon={<Cloud size={40} />}
          color="border-purple-500 bg-purple-900/10"
          isActive={isRemoteActive}
        >
          <AnimatePresence>
            {showFileInRemote ? (
              <GameFile label="Friend's Update" color="bg-yellow-500" icon="🎁" />
            ) : (
                null
            )}
          </AnimatePresence>
        </Zone>

      </div>
    </div>
  );
};

const Zone: React.FC<{
  title: string; icon: React.ReactNode; color: string; isActive: boolean; children?: React.ReactNode
}> = ({ title, icon, color, isActive, children }) => (
  <motion.div 
    layout
    className={`relative rounded-3xl border-4 flex flex-col items-center justify-between p-3 transition-all duration-500 ${color} ${activeStyle(isActive)}`}
  >
    <div className={`text-4xl mb-2 ${isActive ? 'text-white' : 'text-gray-600'}`}>{icon}</div>
    
    <div className="flex-1 w-full flex items-center justify-center relative">
       {children}
    </div>

    <div className="text-center mt-2">
      <h3 className="font-bold text-lg md:text-xl text-white">{title}</h3>
    </div>
  </motion.div>
);

const GameFile: React.FC<{ label: string; color: string; icon?: string }> = ({ label, color, icon }) => (
  <motion.div
    initial={{ scale: 0, y: 50, opacity: 0 }}
    animate={{ scale: 1, y: 0, opacity: 1 }}
    exit={{ scale: 0, y: -50, opacity: 0 }}
    className={`flex flex-col items-center gap-2 z-10 max-w-[120px] text-center`}
  >
    <div className={`w-16 h-16 ${color} rounded-lg shadow-2xl flex items-center justify-center text-3xl text-white font-bold relative group`}>
        {icon || "📄"}
        <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
    </div>
    <span className="text-[10px] leading-tight bg-black/60 px-2 py-1 rounded text-white font-mono break-words w-full">{label}</span>
  </motion.div>
);
