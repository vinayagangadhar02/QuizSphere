
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function InstructionsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();

  if (!subjectId) {
    return <p className="text-center text-xl">Subject not found</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Quiz Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">Welcome to the {subjectId.charAt(0).toUpperCase() + subjectId.slice(1)} quiz!</p>
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
            <Button size="lg">Start Quiz</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
