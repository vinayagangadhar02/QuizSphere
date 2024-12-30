import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAxios } from '@/context/AxiosContext';
interface Subject {
  _id: string;
  title: string;
  description: string;
}

export default function TakeQuiz() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const axios=useAxios()
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/subject'); // Fetch subjects from the correct backend endpoint
        if (Array.isArray(response.data)) {
          setSubjects(response.data); // Update state with fetched subjects
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <Card key={subject._id}>
              <CardHeader>
                <CardTitle>{subject.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{subject.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/instructions/${subject._id}`}>
                  <Button>Take Quiz</Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full">No subjects available. Please check back later.</p>
        )}
      </div>
    </div>
  );
}
