import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { useAxios } from '@/context/AxiosContext'; // Assuming you have a context for Axios requests

interface Result {
  score: number;
  percentage: number;
  message: string;
}

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();
  const { quizId, userId } = location.state; // Expecting quizId and userId passed via state
  const [result, setResult] = useState<Result | null>(null);

  // Fetch results from the backend
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/quiz/results/${userId}/${quizId}`);
        setResult(response.data); // Assuming the backend returns { score, percentage, message }
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      }
    };

    fetchResults();
  }, [axios, userId, quizId]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Loading Results...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We're fetching your results, please wait...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate score and percentage from the backend response
  const { score, percentage, message } = result;

  // Trigger confetti for high scores (above 70%)
  useEffect(() => {
    if (percentage > 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [percentage]);

  // Determine score color based on percentage
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score} / {result ? result.percentage / 10 : 0}
          </div>
          <div className="text-2xl font-semibold mb-6">
            {percentage}%
          </div>
          <div className="text-xl mb-8">
            {message}
          </div>
          <Button onClick={() => navigate('/')} className="w-full max-w-xs">
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;
