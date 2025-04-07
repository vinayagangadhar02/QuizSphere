import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axiosInstance from '@/context/AxiosContext';
import { useParams } from 'react-router-dom';

const ConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
 

const { subjectId } = useParams<{ subjectId: string }>();

  const {answers,questions} = location.state;



  const handleConfirm = async () => {
    try {
      const questionIds = questions.map((q: { _id: any; }) => q._id);

      const response = await axiosInstance.post('/submit-quiz',  {
       
          subjectId, questionIds, answers
       
      });
      
      if (response.status === 200) {
        localStorage.removeItem('questions');
        localStorage.removeItem('quizAnswers');
       navigate('/results',{state:subjectId})
      }
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
