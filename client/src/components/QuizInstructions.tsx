import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizInstructionsProps {
  title: string;
  instructions: string;
  subjectId: string;
}

export default function QuizInstructions({ title, instructions, subjectId }: QuizInstructionsProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription>Please read the instructions carefully before starting the quiz.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg">{instructions}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>You will have 10 minutes to complete the quiz.</li>
            <li>There are 10 questions in total.</li>
            <li>You can navigate between questions using the sidebar or navigation buttons.</li>
            <li>Your progress will be saved as you go.</li>
            <li>You can review and change your answers before submitting.</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Link to={`/${subjectId}/quiz`}>
          <Button size="lg">Start Quiz</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
