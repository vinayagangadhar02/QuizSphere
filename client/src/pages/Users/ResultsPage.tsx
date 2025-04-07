import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import axiosInstance from '@/context/AxiosContext';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const  subjectId = location.state; 
  const [score, setScore] = useState<number | null>(0);
  const [message, setMessage] = useState<string>('');
 

  useEffect(() => {
    const fetchResults = async () => {
      try {

       
        const response = await axiosInstance.get(`/results`, {
          params: { subjectId }
        });
        
        const scoreData = response.data.score

        setScore(scoreData);
        

        if (scoreData >= 8) {
          setMessage('🏆 Excellent performance! You nailed it!');
          confetti();
        } else if (scoreData >= 5) {
          setMessage('🎯 Good job! A little more practice and you’ll be perfect.');
        } else {
          setMessage('📚 Keep practicing! Every expert was once a beginner.');
        }

      } catch (error) {
        console.error("Error fetching quiz results:", error);
      }
    };

    fetchResults();
  }, []);

  if (score === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="text-5xl font-bold text-green-600">{score}/10</div>
          <p className="text-center text-lg text-gray-700 dark:text-gray-300">{message}</p>
          <Button onClick={() => navigate('/')} className="w-full max-w-xs mt-4">
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;
