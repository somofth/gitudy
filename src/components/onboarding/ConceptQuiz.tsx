import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { CheckCircle, XCircle } from 'lucide-react';

const quizzes = [
  {
    question: "Git에서 파일을 저장하기 위해 임시로 담아두는 '현관 앞 박스'는 무엇일까요?",
    options: [
      { text: "Working Directory", correct: false },
      { text: "Staging Area", correct: true },
      { text: "Local Repository", correct: false },
      { text: "Remote Repository", correct: false }
    ],
    explanation: "Staging Area는 확정(Commit)하기 전에 변경사항을 골라서 담아두는 임시 저장소(박스)입니다!"
  },
  {
    question: "박스를 포장해서 창고에 안전하게 보관하는 곳은 어디일까요?",
    options: [
      { text: "Working Directory", correct: false },
      { text: "Staging Area", correct: false },
      { text: "Local Repository", correct: true },
      { text: "Remote Repository", correct: false }
    ],
    explanation: "Local Repository는 내 컴퓨터(로컬)에 버전 기록이 영구적으로 저장되는 '창고'입니다."
  }
];

export const ConceptQuiz: React.FC = () => {
  const { setPhase } = useGameStore();
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const quiz = quizzes[currentQuizIdx];

  const handleSelect = (idx: number) => {
    if (isCorrect !== null) return; 
    
    setSelectedIdx(idx);
    const correct = quiz.options[idx].correct;
    setIsCorrect(correct);
  };

  const handleNext = () => {
    if (currentQuizIdx < quizzes.length - 1) {
       // Reset for next quiz
       setSelectedIdx(null);
       setIsCorrect(null);
       setCurrentQuizIdx(currentQuizIdx + 1);
    } else {
       // All quizzes finished
       setPhase('onboarding-commands');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 relative">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuizIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700"
        >
          <div className="mb-8">
             <div className="flex justify-between items-center mb-4">
               <span className="bg-blue-600 text-xs px-2 py-1 rounded-full text-white font-bold tracking-wide">
                 QUIZ {currentQuizIdx + 1}/{quizzes.length}
               </span>
             </div>
             <h2 className="text-2xl font-bold leading-relaxed">{quiz.question}</h2>
          </div>

          <div className="flex flex-col gap-3">
            {quiz.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isCorrect !== null}
                className={`p-4 rounded-xl text-left transition-all border-2 flex justify-between items-center ${
                  selectedIdx === idx 
                    ? (isCorrect ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500')
                    : 'bg-gray-700 border-transparent hover:border-gray-500'
                } ${isCorrect !== null && opt.correct ? 'bg-green-900/30 border-green-500 ring-2 ring-green-500/50' : ''}`}
              >
                <span className="font-mono text-lg">{opt.text}</span>
                {selectedIdx === idx && (
                  isCorrect ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />
                )}
                {isCorrect !== null && selectedIdx !== idx && opt.correct && <CheckCircle className="text-green-500 opacity-50" />}
              </button>
            ))}
          </div>

          {isCorrect && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-6 border-t border-gray-700"
            >
              <p className="text-green-400 font-bold mb-2">정답입니다! 🎉</p>
              <p className="text-gray-300 text-sm mb-6">{quiz.explanation}</p>
              <button
                onClick={handleNext}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-all shadow-lg hover:shadow-blue-500/20"
              >
                {currentQuizIdx < quizzes.length - 1 ? '다음 문제 →' : '커맨드 배우러 가기 →'}
              </button>
            </motion.div>
          )}
          
          {isCorrect === false && (
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-red-400 font-medium"
             >
               다시 생각해보세요!
               <button onClick={() => { setSelectedIdx(null); setIsCorrect(null); }} className="block mx-auto mt-2 text-sm underline text-gray-400 hover:text-white">다시 풀기</button>
             </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
