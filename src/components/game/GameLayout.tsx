import React from 'react';
import { ViewArea } from './ViewArea';
import { ControlArea } from './ControlArea';

export const GameLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Top/Left: Visuals */}
      <div className="flex-[2] overflow-hidden flex flex-col">
        <ViewArea />
      </div>
      
      {/* Bottom/Right: Controls */}
      <div className="h-1/3 min-h-[300px] border-t border-gray-700">
        <ControlArea />
      </div>
    </div>
  );
};
