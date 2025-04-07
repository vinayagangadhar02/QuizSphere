
import { useParams, Link} from "react-router-dom";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/context/AxiosContext";

export default function InstructionsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subjectTitle, setSubjectTitle] = useState('')

  if (!subjectId) {
    return <p className="text-center text-xl">Subject not found</p>;
  }

  const capitalizeFirstLetter = (string:String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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


  function handleClick(){
    localStorage.setItem(`quizStartTime-${subjectId}`, Date.now().toString());
  }

  return (
    <div className="container my-12 mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Quiz Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">Welcome to the  {subjectTitle} quiz!</p>
          <ul className="list-disc list-inside space-y-2">
            <li>The quiz consists of 10 questions.</li>
            <li>You have 10 minutes to complete the quiz.</li>
            <li>Each question has multiple-choice answers.</li>
            <li>You can navigate between questions using the sidebar or navigation buttons.</li>
            <li>Your progress will be saved as you go.</li>
            <li>Good luck and have fun!</li>
          </ul>
        </CardContent>
        <CardFooter className="justify-center">
          <Link to={`/quiz/${subjectId}`}>
            <Button size="lg" onClick={handleClick}>Start Quiz</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
