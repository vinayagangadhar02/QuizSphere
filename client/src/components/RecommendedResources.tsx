import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface RecommendedResourcesProps {
  score: number;
  totalQuestions: number;
  subject: string;
}

export default function RecommendedResources({ score, totalQuestions, subject }: RecommendedResourcesProps) {
  const percentage = (score / totalQuestions) * 100;

  const getResources = (percentage: number, subject: string) => {
    if (percentage >= 80) {
      return [
        { title: 'Advanced Topics in ' + subject, url: '#' },
        { title: subject + ' for Experts', url: '#' },
        { title: 'Cutting-edge ' + subject + ' Research', url: '#' },
      ];
    } else if (percentage >= 60) {
      return [
        { title: 'Intermediate ' + subject + ' Concepts', url: '#' },
        { title: 'Practice Problems in ' + subject, url: '#' },
        { title: subject + ' Study Guides', url: '#' },
      ];
    } else {
      return [
        { title: subject + ' Basics', url: '#' },
        { title: 'Fundamentals of ' + subject, url: '#' },
        { title: subject + ' for Beginners', url: '#' },
      ];
    }
  };

  const resources = getResources(percentage, subject);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Recommended Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {resources.map((resource, index) => (
            <li key={index}>
              <Link to={resource.url}>
                <Button variant="link">{resource.title}</Button>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
