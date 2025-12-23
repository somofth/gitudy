import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { CheckCircle, XCircle } from 'lucide-react';

const quizzes = [
  {
    question: "Git에서 파일을 저장하기 위해 임시로 담아두는 '현관 앞 박스'는 무엇일까요?",
    options: [
      { text: "Working Directory", correct: false, feedback: "Working Directory는 현재 작업 중인 공간(내 방)입니다. 아직 박스에 담지 않았어요!" },
      { text: "Staging Area", correct: true, feedback: "정답입니다! Staging Area는 커밋하기 전에 파일을 골라 담는 임시 저장소입니다." },
      { text: "Local Repository", correct: false, feedback: "Local Repository는 박스가 이미 포장되어 보관된 창고입니다." },
      { text: "Remote Repository", correct: false, feedback: "Remote Repository는 아주 멀리 있는 물류센터입니다." }
    ]
  },
  {
    question: "박스를 포장해서 창고에 안전하게 보관하는 곳은 어디일까요?",
    options: [
      { text: "Working Directory", correct: false, feedback: "작업 공간은 정돈되지 않은 상태입니다." },
      { text: "Staging Area", correct: false, feedback: "임시 저장소는 아직 포장(Commit)리기 전 단계입니다." },
      { text: "Local Repository", correct: true, feedback: "정답입니다! Local Repository는 버전이 기록되어 안전하게 보관되는 창고입니다." },
      { text: "Remote Repository", correct: false, feedback: "원격 저장소는 로컬 저장소의 내용을 백업하는 곳입니다." }
    ]
  },
  {
    question: "내 컴퓨터가 고장나도 안전하게 파일을 보관하고, 팀원들과 공유할 수 있는 '구름 위 물류센터'는 어디일까요?",
    options: [
      { text: "Working Directory", correct: false, feedback: "내 컴퓨터에 있는 작업 공간이라 고장나면 위험해요!" },
      { text: "Staging Area", correct: false, feedback: "임시 저장소도 내 컴퓨터에 았습니다." },
      { text: "Local Repository", correct: false, feedback: "로컬 저장소도 내 컴퓨터에 있어서 백업이 필요해요." },
      { text: "Remote Repository", correct: true, feedback: "정답입니다! 원격 저장소는 서버에 저장되어 안전하고 공유가 가능합니다." }
    ]
  }
];

export const ConceptQuiz: React.FC = () => {
  const { setPhase } = useGameStore();
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const quiz = quizzes[currentQuizIdx];

  const handleSelect = (idx: number) => {
    // Allow re-selection if not correct. If correct, lock it (optional, but user asked for immediate re-selection on wrong)
    // Actually user said: "if wrong, just show explanation, and let me click another one".
    // So we only lock if correct? Or maybe never lock until next?
    // Let's allow clicking always until correct is found. If correct is found, maybe show next button.
    
    setSelectedIdx(idx);
    const correct = quiz.options[idx].correct;
    setIsCorrect(correct);
  };

  const handleNext = () => {
    if (currentQuizIdx < quizzes.length - 1) {
       setSelectedIdx(null);
       setIsCorrect(null);
       setCurrentQuizIdx(currentQuizIdx + 1);
    } else {
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
                // Disabled only if we already found the correct answer (to prevent spamming after success)
                disabled={isCorrect === true}
                className={`p-4 rounded-xl text-left transition-all border-2 flex justify-between items-center ${
                  selectedIdx === idx 
                    ? (isCorrect ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500')
                    : 'bg-gray-700 border-transparent hover:border-gray-500'
                } ${isCorrect === true && opt.correct ? 'bg-green-900/30 border-green-500 ring-2 ring-green-500/50' : ''}`}
              >
                <span className="font-mono text-lg">{opt.text}</span>
                {selectedIdx === idx && (
                  isCorrect ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />
                )}
                {/* Always show correct indicator if solved */}
                {isCorrect === true && selectedIdx !== idx && opt.correct && <CheckCircle className="text-green-500 opacity-50" />}
              </button>
            ))}
          </div>

          {/* Feedback Section - Always show if selected */}
          <AnimatePresence mode="wait">
            {selectedIdx !== null && (
              <motion.div 
                key={selectedIdx}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-700"
              >
                <p className={`font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? '정답입니다! 🎉' : '아쉽네요!'}
                </p>
                <p className="text-gray-300 text-sm mb-6">
                  {quiz.options[selectedIdx].feedback}
                </p>
                
                {isCorrect && (
                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-all shadow-lg hover:shadow-blue-500/20"
                  >
                    {currentQuizIdx < quizzes.length - 1 ? '다음 문제 →' : '커맨드 배우러 가기 →'}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
