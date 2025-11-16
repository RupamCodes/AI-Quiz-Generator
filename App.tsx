import React, { useState, useCallback } from 'react';
import { QuizQuestion, AppState } from './types';
import { generateQuizQuestions } from './services/geminiService';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import { GeneratorLoaderIcon } from './components/icons';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.START);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [topic, setTopic] = useState<string>('');
  
  const totalMarksPossible = 5 * 1 + 5 * 2 + 5 * 3; // 5 simple, 5 moderate, 5 difficult

  const handleStartQuiz = useCallback(async (quizTopic: string) => {
    setTopic(quizTopic);
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const generatedQuestions = await generateQuizQuestions(quizTopic);
      // Ensure questions are sorted by difficulty as requested
      const sortedQuestions = [...generatedQuestions].sort((a, b) => {
        const difficultyOrder = { 'Simple': 1, 'Moderate': 2, 'Difficult': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });
      setQuestions(sortedQuestions);
      setAppState(AppState.QUIZ);
    } catch (err) {
      setError('Failed to generate quiz questions. Please try a different topic or check your API key.');
      setAppState(AppState.START);
      console.error(err);
    }
  }, []);

  const handleQuizEnd = useCallback((score: number, remainingTime: number) => {
    setFinalScore(score);
    setTimeRemaining(remainingTime);
    setAppState(AppState.RESULTS);
  }, []);

  const handleRestart = useCallback(() => {
    setQuestions([]);
    setError(null);
    setFinalScore(0);
    setTimeRemaining(0);
    setTopic('');
    setAppState(AppState.START);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.LOADING:
        return (
          <div className="flex flex-col items-center justify-center text-white text-center">
            <GeneratorLoaderIcon className="w-16 h-16 mb-4 text-indigo-400" />
            <h2 className="text-2xl font-bold mb-2">Generating Your Quiz...</h2>
            <p className="text-lg text-slate-300">Crafting challenging questions about "{topic}" just for you!</p>
          </div>
        );
      case AppState.QUIZ:
        return <QuizScreen questions={questions} onQuizEnd={handleQuizEnd} />;
      case AppState.RESULTS:
        return <ResultsScreen score={finalScore} totalMarks={totalMarksPossible} timeRemaining={timeRemaining} onRestart={handleRestart} />;
      case AppState.START:
      default:
        return <StartScreen onStart={handleStartQuiz} error={error} />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;