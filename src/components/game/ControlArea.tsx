import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { quizSteps } from '../../data/quizData';
import { toast, Toaster } from 'sonner';

export const ControlArea: React.FC = () => {
    const { currentStepId, nextStep, submitCommand, setCommitMessage } = useGameStore();
    const [isCommitModalOpen, setIsCommitModalOpen] = React.useState(false);
    const [tempCommitMsg, setTempCommitMsg] = React.useState('');

    const step = quizSteps[currentStepId]; // Access directly by index for now (0-based) ?? No, id is 1-based in data but store index is 0-based usually?
    // Let's check store: currentStepId: 0. quizSteps[0] is Level 1.
    // Level 3 is index 2.

    if (!step) {
        return <div className="p-8 text-center">Quiz Completed! Great job!</div>;
    }

    const handleCommand = (cmd: string) => {
        submitCommand(cmd);

        if (cmd === step.correctCommand) {
            // Special handling for Level 3 (Commit) - Index 2
            if (activeStepIndex === 2 && cmd === 'git commit') {
                 setIsCommitModalOpen(true);
                 return;
            }

            triggerSuccess();
        } else {
            useGameStore.getState().incrementError();
            toast.error(step.feedback.error);
        }
    };

    const triggerSuccess = () => {
        // Start animation immediately
        useGameStore.getState().setAnimatingSuccess(true);

        toast.success(step.feedback.success, {
            duration: 2000,
        });
        setTimeout(() => {
            // Stop animation and move to next step
            useGameStore.getState().setAnimatingSuccess(false);

            if (activeStepIndex >= quizSteps.length - 1) {
                // If this was the last step
                useGameStore.getState().setPhase('success');
            } else {
                nextStep();
            }
        }, 2500); // Increased delay to allow for animation
    };

    const handleCommitSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!tempCommitMsg.trim()) {
            toast.error("메시지를 입력해주세요!");
            return;
        }
        setCommitMessage(tempCommitMsg);
        setIsCommitModalOpen(false);
        triggerSuccess();
    };
    
    // Fix: currentStepId from store is 0-based index or ID? 
    // Data says id: 1, 2, 3...
    // Store says nextStep: currentStepId + 1. 
    // Usually means currentStepId IS the index.
    const activeStepIndex = currentStepId; 

    return (
        <div className="h-full flex flex-col bg-gray-900 border-t border-gray-700 relative">
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

            {/* Commit Message Modal */}
            {isCommitModalOpen && (
                <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
                    <form onSubmit={handleCommitSubmit} className="bg-gray-800 p-6 rounded-2xl border border-gray-600 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
                        <h3 className="text-xl font-bold text-white mb-4">커밋 메시지 작성</h3>
                        <p className="text-gray-400 mb-4 text-sm">어떤 변경 사항인지 기록해 주세요.</p>
                        <input 
                            type="text" 
                            value={tempCommitMsg}
                            onChange={(e) => setTempCommitMsg(e.target.value)}
                            placeholder="예: 로그인 기능 구현 완료"
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white mb-4 focus:outline-none focus:border-blue-500 transition-colors"
                            autoFocus
                        />
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors"
                        >
                            작성 완료 (Commit)
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
