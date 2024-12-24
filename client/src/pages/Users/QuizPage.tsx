import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const mockQuestions = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
  },
  // Add more questions here
];

const QuizPage = ({ subjectId }: { subjectId: string }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(mockQuestions.length).fill(''));
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleClear = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = '';
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log('Quiz submitted:', answers);
    navigate('/results'); // Redirect to the results page
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="container mx-auto py-8 flex">
      <div className="w-3/4 pr-8">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{subjectId.charAt(0).toUpperCase() + subjectId.slice(1)} Quiz</h1>
          <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Question {currentQuestion + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{mockQuestions[currentQuestion].question}</p>
            <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
              {mockQuestions[currentQuestion].options.map((option, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="justify-between">
            <Button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</Button>
            <Button onClick={handleClear}>Clear Response</Button>
            <Button onClick={handleNext} disabled={currentQuestion === mockQuestions.length - 1}>Next</Button>
          </CardFooter>
        </Card>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSubmit}>Submit Quiz</Button>
        </div>
      </div>
      <div className="w-1/4">
        <Card>
          <CardHeader>
            <CardTitle>Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {mockQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant={answers[index] ? 'default' : 'outline'}
                  className={`w-10 h-10 ${currentQuestion === index ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
