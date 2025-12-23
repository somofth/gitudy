import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Coffee, Code } from 'lucide-react';

export const StoryIntro: React.FC = () => {
  const { setPhase } = useGameStore();
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "당신은 밤새 코딩 중인 힘없는 대학생입니다...",
    "내일이 과제 마감일인데, 아직 코드는 엉망이죠.",
    "교수님: \"자네, Git으로 버전 관리는 하고 있나?\"",
    "당신: \"...네? 그게 뭐죠? 먹는 건가요?\"",
    "지금부터 Git의 힘을 빌려, 과제를 무사히 제출해봅시다!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < texts.length - 1) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 1000); // Show next line every 1 second

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100dvh] bg-gray-900 text-white p-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10"><Code size={200} /></div>
        <div className="absolute bottom-10 left-10"><Coffee size={200} /></div>
      </div>

      <div className="z-10 max-w-2xl w-full flex flex-col gap-6">
        {texts.map((text, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: idx <= textIndex ? 1 : 0, x: idx <= textIndex ? 0 : -20 }}
            transition={{ duration: 0.8 }}
            className={`text-xl md:text-2xl font-medium leading-relaxed ${
              idx === texts.length - 1 ? 'text-blue-400 font-bold mt-4' : 'text-gray-300'
            }`}
          >
            {text}
          </motion.p>
        ))}
      </div>

      {textIndex === texts.length - 1 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={() => setPhase('game')}
          className="z-10 mt-12 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          미션 시작하기 🚀
        </motion.button>
      )}
    </div>
  );
};
