
import React from 'react';
import { AwardIcon } from './icons';

interface ResultsScreenProps {
  score: number;
  totalMarks: number;
  timeRemaining: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalMarks, timeRemaining, onRestart }) => {
  const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="text-center bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 animate-fade-in">
      <div className="flex justify-center items-center mb-6">
        <AwardIcon className="w-20 h-20 text-yellow-400" />
      </div>
      <h1 className="text-4xl font-extrabold mb-2 text-slate-100">
        Quiz Complete!
      </h1>
      <p className="text-slate-300 mb-8 max-w-md mx-auto">
        Here's how you performed. Great job for taking the challenge!
      </p>

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8 flex flex-col sm:flex-row justify-around items-center gap-6">
        <div className="text-center">
          <p className="text-slate-400 text-sm font-medium">TOTAL SCORE</p>
          <p className="text-4xl font-bold text-green-400">
            {score} <span className="text-2xl text-slate-400">/ {totalMarks}</span>
          </p>
        </div>
        <div className="w-full sm:w-px h-px sm:h-20 bg-slate-700"></div>
        <div className="text-center">
          <p className="text-slate-400 text-sm font-medium">ACCURACY</p>
          <p className="text-4xl font-bold text-cyan-400">
            {percentage}%
          </p>
        </div>
        <div className="w-full sm:w-px h-px sm:h-20 bg-slate-700"></div>
        <div className="text-center">
          <p className="text-slate-400 text-sm font-medium">TIME REMAINING</p>
          <p className="text-4xl font-bold text-indigo-400">
            {formatTime(timeRemaining)}
          </p>
        </div>
      </div>
      
      <button
        onClick={onRestart}
        className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200"
      >
        Play Again
      </button>
    </div>
  );
};

export default ResultsScreen;
