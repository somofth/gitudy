import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

import { useGameStore } from '../store/useGameStore';

export const SuccessScreen: React.FC = () => {
    const { errorCount } = useGameStore();

    const getFeedbackMessage = () => {
        if (errorCount === 0) return "Git의 신이시군요! 완벽합니다. 🌟";
        if (errorCount <= 2) return "재능이 보이네요! 조금만 더 연습하면 완벽해요. 👍";
        return "괜찮아요, 실패는 성공의 어머니! 다시 도전해볼까요? 🌱";
    };

    useEffect(() => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);
    const handleShare = async () => {
        const shareData = {
            title: 'Git-Vis: Git 개념 마스터!',
            text: `Git의 기초 개념을 마스터했어요! 내 코딩 점수는 [Error: ${errorCount}회]. 당신도 도전해보세요.`,
            url: window.location.href,
        };

        if (navigator.share && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share canceled');
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('주소가 복사되었습니다!');
        }
    };

    return (
        <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-y-auto py-10">
             {/* Background Glow */}
             <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
             
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="z-10 flex flex-col items-center max-w-lg text-center p-8"
             >
                {/* Cute Developer Character Placeholder */}
                <div className="text-[100px] mb-6 animate-bounce">
                    👩🏻‍💻
                </div>

                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
                >
                    {getFeedbackMessage()}
                </motion.h1>

                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-300 text-lg mb-10"
                >
                    <span className="text-gray-500 text-sm block mb-2">[ error: {errorCount}회 ]</span>
                    축하합니다! 이제 로컬과 원격을 오가는<br/>
                    Git의 기본 흐름을 완벽하게 익히셨군요.
                </motion.p>

                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:shadow-blue-500/20 transition-all"
                    >
                        <Share2 size={24} />
                        이 사이트 공유하기
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()} // Simple reload for now to restart
                        className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-2xl font-medium transition-all"
                    >
                         <RotateCcw size={20} />
                         처음으로 돌아가기
                    </motion.button>
                </div>
             </motion.div>
        </div>
    );
};
