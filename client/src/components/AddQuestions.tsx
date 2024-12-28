import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { Trash2, Edit } from 'lucide-react'
import { useAxios } from '@/context/AxiosContext'
import { useParams } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/ColorContext/ColorContext'
import { Link } from 'react-router-dom'
import { useLogout } from '@/LogoutContext/LogoutContext'

interface Question {
  _id?: string
  question: string
  answers: string[]
  correctAnswer: string
}

export default function QuestionForm() {
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

  const { subjectId } = useParams()
  const [subjectTitle, setSubjectTitle] = useState('')
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('0')
  const [questions, setQuestions] = useState<Question[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const axios = useAxios()

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        if (subjectId) {
          
          const response = await axios.get(`/subject/${subjectId}`);
          setSubjectTitle(response.data.title);
          console.log(response.data.title);
        }
      } catch (error) {
        console.error('Error fetching subject', error);
      }
    };
  
    fetchSubject();
  }, [subjectId]);
  

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const resetForm = () => {
    setQuestion('')
    setAnswers(['', '', '', ''])
    setCorrectAnswer('0')
    setEditingIndex(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim() || answers.some(answer => !answer.trim())) {
      alert('Please fill in all fields')
      return
    }

    const questionData = {
      subjectId,
      question,
      answers,
      correctAnswer
    }

    try {
      if (editingIndex !== null) {
        const questionId = questions[editingIndex]._id
        const response = await axios.put('/questions/update', { questionId, updatedQuestion: questionData })
        const updatedQuestions = [...questions]
        updatedQuestions[editingIndex] = response.data
        setQuestions(updatedQuestions)
      } else {
        const response = await axios.post('/questions/add', questionData)
        setQuestions([...questions, response.data])
      }
      resetForm()
    } catch (error) {
      console.error('Error saving question', error)
      alert('Error saving question')
    }
  }

  const handleEdit = (index: number) => {
    const q = questions[index]
    setQuestion(q.question)
    setAnswers(q.answers)
    setCorrectAnswer(q.correctAnswer)
    setEditingIndex(index)
  }

  const handleDelete = async (index: number) => {
    const questionId = questions[index]._id
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this question?');
      if(!confirmDelete){
        return
      }
      await axios.delete('/questions/delete', { data: { questionId } })
      setQuestions(questions.filter((_, i) => i !== index))
    } catch (error) {
      console.error('Error deleting question', error)
      alert('Error deleting question')
    }
  }

  useEffect(() => {
    if (subjectId) {
      axios.get(`/questions/${subjectId}`)
        .then(response => setQuestions(response.data))
        .catch(error => console.error('Error fetching questions', error))
    }
  }, [subjectId, axios])

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
        <div className="flex items-center">
  {subjectTitle ? (
    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
      {subjectTitle}
    </span>
  ) : (
  <span className="text-2xl font-bold text-gray-600 dark:text-gray-400"></span>
  )}
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
    <div className="w-full max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-6">Add Questions</h1>
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="question">Question</Label>
          <Input id="question" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full" />
        </div>
        <RadioGroup value={correctAnswer} onValueChange={setCorrectAnswer}>
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input value={answer} onChange={(e) => handleAnswerChange(index, e.target.value)} className="flex-1" placeholder={`Option ${index + 1}`} />
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
                <Label htmlFor={`answer-${index}`}>Correct</Label>
              </div>
            </div>
          ))}
        </RadioGroup>
        <div className="space-y-2">
          <Button type="submit" className="w-full md:w-auto ">
            {editingIndex !== null ? 'Update Question' : 'Add Question'}
          </Button>
          {editingIndex !== null && (
            <Button type="button" variant="outline" className="w-full md:w-auto ml-2 " onClick={resetForm}>
              Cancel Edit
            </Button>
          )}
          <Button type="button" variant="outline" className="w-full md:w-auto ml-2" onClick={() => window.history.back()}>
            Back to Subjects
          </Button>
        </div>
      </form>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Added Questions</h2>
        {questions.map((q, index) => (
          <Card key={index} className="p-4 relative">
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(index)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="pr-16">
              <p className="font-medium mb-2">{index + 1}. {q.question}</p>
              <div className="pl-4 space-y-1">
                {q.answers.map((answer, ansIndex) => (
                  <p key={ansIndex} className={ansIndex.toString() === q.correctAnswer ? 'text-green-600 font-medium' : ''}>
                    {String.fromCharCode(97 + ansIndex)}. {answer}{ansIndex.toString() === q.correctAnswer && ' ✓'}
                  </p>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
    </>
  )
}
