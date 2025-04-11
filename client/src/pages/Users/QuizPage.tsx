import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/ColorContext/ColorContext';
import { Sun, Moon } from 'lucide-react';
import axiosInstance from '@/context/AxiosContext';
import { useQuiz } from '../../QuizContext/QuizContext';


interface Question {
  _id?: string;
  question: string;
  answers: string[];
}

const QuizPage = ({ subjectId }: { subjectId: string }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); 
  const [questions, setQuestions] = useState<Question[]>([]);

  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [subjectTitle, setSubjectTitle] = useState('');
  const { answers, setAnswer, clearAnswer, clearAll } = useQuiz(); 

 
  
  useEffect(() => {
    const storedQuestions = localStorage.getItem(`questions-${subjectId}`);
  
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      axiosInstance.get<Question[]>(`/questions/question/${subjectId}`)
        .then(response => {
          setQuestions(response.data); 
          localStorage.setItem(`questions-${subjectId}`, JSON.stringify(response.data));
        })
        .catch(error => console.error('Error fetching questions', error));
    }
  }, [subjectId, axiosInstance]);
  
  

  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setMounted(true);
    }
  }, []);


  useEffect(() => {
    const fetchSubject = async () => {
      try {
        if (subjectId) {
          const response = await axiosInstance.get(`/subject/${subjectId}`);
          setSubjectTitle(capitalizeFirstLetter(response.data.title));
        }
      } catch (error) {
        console.error('Error fetching subject', error);
      }
    };

    fetchSubject();
  }, [subjectId]);
  

  useEffect(() => {
    const startTime = localStorage.getItem(`quizStartTime-${subjectId}`);
    
    if (!startTime) {
      localStorage.setItem(`quizStartTime-${subjectId}`, Date.now().toString());
    }
  
    const intervalId = setInterval(() => {
      const quizStartTime = parseInt(localStorage.getItem(`quizStartTime-${subjectId}`) || Date.now().toString());
      const elapsedSeconds = Math.floor((Date.now() - quizStartTime) / 1000);
      const remaining = Math.max(25 - elapsedSeconds, 0);
      setTimeLeft(remaining);
  
      if (remaining <= 0) {
        clearInterval(intervalId);
        autoSubmitQuiz();
      }
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [subjectId, questions, answers]);
  
  const autoSubmitQuiz = async () => {
    try {
      const questionIds = questions.map((q) => q._id);
      const response = await axiosInstance.post('/submit-quiz', {
        subjectId,
        questionIds,
        answers,
      });
  
      if (response.status === 200) {
        localStorage.removeItem('questions');
        localStorage.removeItem('quizAnswers');
        clearAll()
        navigate('/results', { state: subjectId });
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };
  

  const capitalizeFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
  
    navigate(`/confirmpage/${subjectId}`, { state: { answers, questions } });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }



  

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                Quiz App
              </span>
              <h1 className="text-2xl mx-10 font-bold">{subjectTitle}</h1>
            </div>
            <div className="ml-auto flex items-center">
              <div className='mx-5'>
                <button
                  onClick={toggleTheme}
                  className="ml-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
                >
                  {mounted && (theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8 flex">
        <div className="w-3/4 pr-8">
          <div className="mb-4 flex justify-between items-center">
            <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{questions[currentQuestion].question}</p>
              {currentQuestion}
              <RadioGroup value={answers[currentQuestion]} onValueChange={(answer) => setAnswer(currentQuestion, answer)} key={currentQuestion}>
                {questions[currentQuestion].answers.map((option, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="justify-between">
              <Button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</Button>
              <Button onClick={() => clearAnswer(currentQuestion)}>Clear Response</Button>
              <Button onClick={handleNext} disabled={currentQuestion === questions.length - 1}>Next</Button>
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
                {questions.map((_, index) => (
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
    </>
  );
};

export default QuizPage;
