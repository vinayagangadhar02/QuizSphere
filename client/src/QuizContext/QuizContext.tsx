import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface QuizContextType {
  answers: string[];
  setAnswer: (index: number, answer: string) => void;
  clearAnswer: (index: number) => void;
  clearAll: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {

  const savedAnswers = localStorage.getItem('quizAnswers');
  const [answers, setAnswers] = useState<string[]>(savedAnswers ? JSON.parse(savedAnswers) : []);

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
    newAnswers[index] = ''; 
    setAnswers(newAnswers);
  };

  const clearAll = () => {
    setAnswers([]);
  }

  return (
    <QuizContext.Provider value={{ answers, setAnswer, clearAnswer, clearAll }}>
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
