import React, { useState } from 'react';
import { QuizAiIcon, AlertTriangleIcon } from './icons';

interface StartScreenProps {
  onStart: (topic: string) => void;
  error: string | null;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, error }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onStart(topic.trim());
    }
  };

  return (
    <div className="text-center bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
      <div className="flex justify-center items-center mb-6">
        <QuizAiIcon className="w-16 h-16 text-indigo-400" />
      </div>
      <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
        AI-Powered Timed Quiz
      </h1>
      <p className="text-slate-300 mb-8 max-w-md mx-auto">
        Enter any topic below and our AI will generate a challenging timed quiz for you.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Solar System, Python Basics..."
          className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          required
        />
        <button
          type="submit"
          disabled={!topic.trim()}
          className="w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Start Quiz
        </button>
      </form>
      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg flex items-center gap-3">
          <AlertTriangleIcon className="w-6 h-6 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default StartScreen;