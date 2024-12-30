import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAxios } from '@/context/AxiosContext';
import { useTheme } from '@/ColorContext/ColorContext'
import { Sun, Moon } from 'lucide-react'
import { useLogout } from '@/LogoutContext/LogoutContext'

interface Subject {
  _id: string;
  title: string;
  description: string;
}

export default function TakeQuiz() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const axios=useAxios()

  const { logout } = useLogout();
  const [mounted, setMounted] = useState(false)
    const [theme1, setTheme1] = useState<'light' | 'dark'>('light')
    const { theme, toggleTheme } = useTheme();
    

    useEffect(() => {
     
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (savedTheme) {
        setTheme1(savedTheme)
      }
      setMounted(true)
    }, [])
  

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
    <>
     <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Quiz App
          </Link>
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
        <div >
          <Button onClick={logout} className='mx-5 '>Logout</Button>
        </div>
      </div>
    </div>
  </nav>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Time!!</h1>
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
  </>
  );
}
