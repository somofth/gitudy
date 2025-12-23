import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { quizSteps } from '../../data/quizData';
import { toast, Toaster } from 'sonner';

export const ControlArea: React.FC = () => {
    const { currentStepId, nextStep, submitCommand } = useGameStore();
    // Ensure we handle out of bounds gracefully in case completed
    const step = quizSteps[currentStepId];

    if (!step) {
        return <div className="p-8 text-center">Quiz Completed! Great job!</div>;
    }

    const handleCommand = (cmd: string) => {
        submitCommand(cmd); // Log to store
    
        if (cmd === step.correctCommand) {
            toast.success(step.feedback.success, {
                duration: 2000,
                onAutoClose: () => nextStep(),
            });
            // Delay next step slightly for effect? 
            // Better to let store handle logic, but here simple timeout works.
            setTimeout(() => {
                nextStep();
            }, 1500);
        } else {
            toast.error(step.feedback.error);
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-900 border-t border-gray-700">
            <Toaster position="top-center" richColors />
            
            {/* Scenario */}
            <div className="p-6 bg-gray-800/50 border-b border-gray-700">
                <h3 className="text-gray-400 text-sm uppercase font-bold tracking-wider mb-2">Current Mission</h3>
                <p className="text-xl text-white font-medium">
                    {step.scenario}
                </p>
            </div>

            {/* Command Pad */}
            <div className="flex-1 p-6 grid grid-cols-2 gap-4">
                {step.options.map((cmd) => (
                    <button
                        key={cmd}
                        onClick={() => handleCommand(cmd)}
                        className="bg-gray-700 hover:bg-blue-600 text-gray-100 font-mono text-lg rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center border border-gray-600 hover:border-blue-400"
                    >
                        {cmd}
                    </button>
                ))}
            </div>
        </div>
    );
};
