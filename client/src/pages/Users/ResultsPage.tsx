import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions } = location.state;

  // Calculate score based on answers
  const score = answers.reduce((acc: number, answer:number, index:number) => {
    if (answer === questions[index].correctAnswer) {
      return acc + 1;  // Increase score if the answer is correct
    }
    return acc;  // Otherwise, no increase in score
  }, 0);

  // Calculate percentage score
  const percentage = Math.round((score / questions.length) * 100);

  // Trigger confetti for high scores (above 70%)
  useEffect(() => {
    if (percentage > 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  // Determine score color based on percentage
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get a personalized message based on score
  const getMessage = () => {
    if (percentage >= 80) return 'Excellent work!';
    if (percentage >= 60) return 'Good job!';
    return 'Keep practicing!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score} / {questions.length}
          </div>
          <div className="text-2xl font-semibold mb-6">
            {percentage}%
          </div>
          <div className="text-xl mb-8">
            {getMessage()}
          </div>
          <Button 
            onClick={() => navigate('/')} 
            className="w-full max-w-xs"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;
