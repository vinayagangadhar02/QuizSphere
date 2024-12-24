'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { Trash2, Edit } from 'lucide-react'

interface Question {
  question: string
  answers: string[]
  correctAnswer: string
}

export default function QuestionForm() {
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('0')
  const [questions, setQuestions] = useState<Question[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!question.trim() || answers.some(answer => !answer.trim())) {
      alert('Please fill in all fields')
      return
    }

    if (editingIndex !== null) {
      // Update existing question
      const updatedQuestions = [...questions]
      updatedQuestions[editingIndex] = { question, answers, correctAnswer }
      setQuestions(updatedQuestions)
    } else {
      // Add new question
      setQuestions([...questions, { question, answers, correctAnswer }])
    }

    resetForm()
  }

  const handleDelete = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleEdit = (index: number) => {
    const questionToEdit = questions[index]
    setQuestion(questionToEdit.question)
    setAnswers(questionToEdit.answers)
    setCorrectAnswer(questionToEdit.correctAnswer)
    setEditingIndex(index)
  }

  return (
    <div className="w-full max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-6">Add Questions</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full"
          />
        </div>

        <RadioGroup value={correctAnswer} onValueChange={setCorrectAnswer}>
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="flex-1"
                placeholder={`Option ${index + 1}`}
              />
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
                <Label htmlFor={`answer-${index}`}>Correct</Label>
              </div>
            </div>
          ))}
        </RadioGroup>

        <div className="space-y-2">
          <Button type="submit" className="w-full md:w-auto">
            {editingIndex !== null ? 'Update Question' : 'Add Question'}
          </Button>
          {editingIndex !== null && (
            <Button
              type="button"
              variant="outline"
              className="w-full md:w-auto ml-2"
              onClick={resetForm}
            >
              Cancel Edit
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            className="w-full md:w-auto ml-2"
            onClick={() => window.history.back()}
          >
            Back to Subjects
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Added Questions</h2>
        {questions.map((q, index) => (
          <Card key={index} className="p-4 relative">
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(index)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="pr-16">
              <p className="font-medium mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="pl-4 space-y-1">
                {q.answers.map((answer, ansIndex) => (
                  <p key={ansIndex} className={ansIndex.toString() === q.correctAnswer ? 'text-green-600 font-medium' : ''}>
                    {String.fromCharCode(97 + ansIndex)}. {answer}
                    {ansIndex.toString() === q.correctAnswer && ' ✓'}
                  </p>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

