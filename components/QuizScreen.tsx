import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { QuizQuestion, Difficulty } from '../types';
import TimerBar from './TimerBar';
// FIX: Removed unused icon imports for CheckCircleIcon and XCircleIcon as they are not exported from './icons'.
import { ClockIcon } from './icons';

interface QuizScreenProps {
  questions: QuizQuestion[];
  onQuizEnd: (score: number, timeRemaining: number) => void;
}

const DIFFICULTY_CONFIG: Record<Difficulty, { time: number; points: number }> = {
  Simple: { time: 10, points: 1 },
  Moderate: { time: 20, points: 2 },
  Difficult: { time: 30, points: 3 },
};
const OVERALL_TIME = 300;

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [overallTime, setOverallTime] = useState(OVERALL_TIME);
  const [questionTime, setQuestionTime] = useState(0);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const config = useMemo(() => DIFFICULTY_CONFIG[currentQuestion.difficulty], [currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore(prev => prev + config.points);
    }
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onQuizEnd(score, overallTime);
    }
  }, [selectedAnswer, currentQuestion, config.points, currentQuestionIndex, questions.length, onQuizEnd, score, overallTime]);
  
  // Initialize question timer on new question
  useEffect(() => {
    setQuestionTime(config.time);
  }, [currentQuestionIndex, config.time]);


  // Overall timer
  useEffect(() => {
    if (overallTime <= 0) {
      onQuizEnd(score, 0);
      return;
    }
    const timer = setInterval(() => {
      setOverallTime(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [overallTime, onQuizEnd, score]);

  // Per-question timer
  useEffect(() => {
    if (questionTime <= 0) {
      handleNextQuestion();
      return;
    }
    const timer = setInterval(() => {
      setQuestionTime(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [questionTime, handleNextQuestion]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700 w-full animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className={`px-3 py-1 text-sm font-semibold rounded-full ${
          currentQuestion.difficulty === 'Simple' ? 'bg-green-800 text-green-200' :
          currentQuestion.difficulty === 'Moderate' ? 'bg-yellow-800 text-yellow-200' :
          'bg-red-800 text-red-200'
        }`}>
          {currentQuestion.difficulty}
        </div>
        <div className="flex items-center gap-2 text-lg font-bold text-cyan-300">
          <ClockIcon className="w-6 h-6" />
          <span>{formatTime(overallTime)}</span>
        </div>
        <div className="text-lg font-bold">Score: <span className="text-green-400">{score}</span></div>
      </div>

      {/* Question Timer Bar */}
      <TimerBar duration={config.time} timeLeft={questionTime} />

      {/* Question */}
      <div className="my-6">
        <p className="text-slate-400 mb-2 font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">{currentQuestion.question}</h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(option)}
            className={`p-4 rounded-lg text-left transition-all duration-200 border-2 
              ${selectedAnswer === option 
                ? 'bg-indigo-600 border-indigo-500 ring-2 ring-indigo-400' 
                : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500'}
            `}
          >
            <span className="font-semibold">{option}</span>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="mt-8 text-right">
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;