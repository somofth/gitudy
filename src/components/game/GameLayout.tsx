import React from 'react';
import { ViewArea } from './ViewArea';
import { ControlArea } from './ControlArea';

export const GameLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-900 overflow-y-auto">
      {/* Top/Left: Visuals */}
      <div className="flex-1 flex flex-col min-h-[400px]">
        <ViewArea />
      </div>
      
      {/* Bottom/Right: Controls */}
      <div className="shrink-0 min-h-[300px] border-t border-gray-700 bg-gray-900 sticky bottom-0 z-10">
        <ControlArea />
      </div>
    </div>
  );
};
