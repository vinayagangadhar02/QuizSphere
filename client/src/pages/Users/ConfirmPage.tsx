import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers, questions } = location.state;

  const handleConfirm = () => {
    navigate('/results', { state: { answers, questions } });
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

