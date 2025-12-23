import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { quizSteps } from '../../data/quizData';
import { Package, Truck, Home, Cloud, Archive, Box } from 'lucide-react';
import type { ZoneType } from '../../types/game';

// Helper to determine active zone based on step state
const getActiveZone = (state: string): ZoneType => {
  switch (state) {
    case 'modified': return 'working';
    case 'staged': return 'staging';
    case 'committed': return 'local';
    case 'pushed': return 'remote';
    default: return 'working';
  }
};

export const ViewArea: React.FC = () => {
  const { currentStepId } = useGameStore();
  const currentStep = quizSteps.find(s => s.id === currentStepId + 1); // 1-based ID vs 0-based index? Mapping logic needed.
  // Actually store has currentStepId default 0. Let's assume we map quizSteps[currentStepId].

  const step = quizSteps[currentStepId] || quizSteps[0];
  const activeZone = getActiveZone(step.currentVisualState);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gray-800">
      {/* Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-full max-w-6xl">
        
        {/* Working Directory */}
        <Zone 
          title="Working Directory" 
          sub="My Room" 
          color="bg-red-900/30 border-red-500/50" 
          icon={<Home className="text-red-400" size={32} />}
          isActive={activeZone === 'working'}
        >
          {activeZone === 'working' && <FileObject type="modified" />}
        </Zone>

        {/* Staging Area */}
        <Zone 
          title="Staging Area" 
          sub="Hallway Box" 
          color="bg-green-900/30 border-green-500/50" 
          icon={<Box className="text-green-400" size={32} />}
          isActive={activeZone === 'staging'}
        >
           {activeZone === 'staging' && <FileObject type="staged" />}
        </Zone>

        {/* Local Repo */}
        <Zone 
          title="Local Repository" 
          sub="Storage" 
          color="bg-blue-900/30 border-blue-500/50" 
          icon={<Archive className="text-blue-400" size={32} />}
          isActive={activeZone === 'local'}
        >
           {activeZone === 'local' && <FileObject type="committed" />}
        </Zone>

        {/* Remote Repo */}
        <Zone 
          title="Remote Repository" 
          sub="Cloud Center" 
          color="bg-purple-900/30 border-purple-500/50" 
          icon={<Cloud className="text-purple-400" size={32} />}
          isActive={activeZone === 'remote'}
        >
           {activeZone === 'remote' && <FileObject type="pushed" />}
        </Zone>
      </div>
    </div>
  );
};

const Zone: React.FC<{
  title: string; 
  sub: string; 
  color: string; 
  icon: React.ReactNode; 
  isActive: boolean;
  children: React.ReactNode;
}> = ({ title, sub, color, icon, isActive, children }) => (
  <div className={`relative flex flex-col items-center justify-start pt-8 border-2 rounded-xl transition-all duration-500 ${color} ${isActive ? 'opacity-100 scale-105 shadow-xl' : 'opacity-50 blur-sm scale-95'}`}>
    <div className="absolute top-4 left-4 opacity-50">{icon}</div>
    <h3 className="text-lg font-bold text-gray-200">{title}</h3>
    <p className="text-sm text-gray-400 mb-8">{sub}</p>
    <div className="flex-1 w-full flex items-center justify-center p-4">
      <AnimatePresence mode="popLayout">
        {children}
      </AnimatePresence>
    </div>
  </div>
);

const FileObject: React.FC<{ type: string }> = ({ type }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg text-gray-900">
        {type === 'modified' && <div className="text-3xl">📄</div>}
        {type === 'staged' && <div className="text-3xl">📦</div>}
        {type === 'committed' && <div className="text-3xl">🗳️</div>}
        {type === 'pushed' && <div className="text-3xl">🚚</div>}
      </div>
      <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded text-white">{type}</span>
    </motion.div>
  );
};
