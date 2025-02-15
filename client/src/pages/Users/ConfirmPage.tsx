import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAxios } from '@/context/AxiosContext';

const ConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers, questions } = location.state;
  const axios = useAxios();

  interface Question {
    _id: string;
    question: string;
    answers: string[];
  }

  interface SubmissionData {
    questionId: string;
    selectedAnswer: string;
  }

  const handleConfirm = async () => {
    const quizIdKey = Object.keys(localStorage).find((key) =>
      key.startsWith('questions-')
    );
    const questionsData: Question[] | null = quizIdKey
      ? JSON.parse(localStorage.getItem(quizIdKey) || 'null')
      : null;
    
    const quizAnswers: string[] | null = JSON.parse(
      localStorage.getItem('quizAnswers') || 'null'
    );
    const userId: string | null = JSON.parse(localStorage.getItem('userId') || 'null');

    if (!questionsData || !quizAnswers || !userId) {
      console.error('Missing data in localStorage!');
      return;
    }

    try {
      const submissionData: SubmissionData[] = questionsData.map((question, index) => ({
        questionId: question._id,
        selectedAnswer: quizAnswers[index] || '',
      }));

      const payload = {
        submissionData,
        userId,
        quizId: quizIdKey!.split('-')[1],
      };

      const response = await axios.post('/submit-quiz', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to submit quiz results');
      }

      localStorage.removeItem(quizIdKey!);
      localStorage.removeItem('quizAnswers');
      

      navigate('/results', {
        state: {
          userId,
          quizId: quizIdKey!.split('-')[1],
        },
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Confirm Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Are you sure you want to submit your quiz?</p>
          <p>You have answered {answers.filter(Boolean).length} out of {questions.length} questions.</p>
        </CardContent>
        <CardFooter className="justify-between">
          <Button onClick={handleReturn}>Return to Quiz</Button>
          <Button onClick={handleConfirm}>Confirm Submission</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConfirmPage;
