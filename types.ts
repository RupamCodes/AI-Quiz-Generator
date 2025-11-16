
export type Difficulty = 'Simple' | 'Moderate' | 'Difficult';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  difficulty: Difficulty;
}

export enum AppState {
  START,
  LOADING,
  QUIZ,
  RESULTS
}
