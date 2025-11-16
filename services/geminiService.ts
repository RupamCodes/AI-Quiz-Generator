import { QuizQuestion } from '../types';

// Point to your local Python backend
const API_URL = 'http://localhost:8000/api/generate-quiz';

export const generateQuizQuestions = async (topic: string): Promise<QuizQuestion[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch quiz questions');
    }

    const data = await response.json();
    return data as QuizQuestion[];
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw error;
  }
};