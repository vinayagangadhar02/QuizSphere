import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface QuizContextType {
  answers: string[];
  setAnswer: (index: number, answer: string) => void;
  clearAnswer: (index: number) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  // Load saved answers directly from localStorage during initialization
  const savedAnswers = localStorage.getItem('quizAnswers');
  const [answers, setAnswers] = useState<string[]>(savedAnswers ? JSON.parse(savedAnswers) : []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
  }, [answers]);

  const setAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const clearAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = ''; // You could use null or undefined instead of an empty string
    setAnswers(newAnswers);
  };

  return (
    <QuizContext.Provider value={{ answers, setAnswer, clearAnswer }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
