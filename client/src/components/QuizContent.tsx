import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import Timer from '../components/Timer'
import Sidebar from '../components/Sidebar'

interface Question {
  id: number
  question: string
  options: string[]
}

interface QuizContentProps {
  question: Question
  answer: string | null
  onAnswer: (answer: string) => void
  onNext: () => void
  onPrevious: () => void
  onClear: () => void
  onSubmit: () => void
  totalQuestions: number
  currentQuestionIndex: number
  answers: (string | null)[]
}

export default function QuizContent({
  question,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  onClear,
  onSubmit,
  totalQuestions,
  currentQuestionIndex,
  answers,
}: QuizContentProps) {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          onSubmit()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onSubmit])

  const handleQuestionClick = (index: number) => {
    if (index < currentQuestionIndex) {
      for (let i = currentQuestionIndex; i > index; i--) {
        onPrevious()
      }
    } else if (index > currentQuestionIndex) {
      for (let i = currentQuestionIndex; i < index; i++) {
        onNext()
      }
    }
  }

  return (
    <div className="container mx-auto p-4 flex">
      <div className="flex-grow mr-4">
        <div className="mb-4">
          <Timer timeLeft={timeLeft} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Question {currentQuestionIndex + 1}</h2>
        <p className="text-lg mb-4">{question.question}</p>
        <RadioGroup value={answer || ''} onValueChange={onAnswer}>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-between mt-6">
          <Button onClick={onPrevious} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          <Button onClick={onClear}>Clear Response</Button>
          {currentQuestionIndex === totalQuestions - 1 ? (
            <Button onClick={onSubmit}>Submit</Button>
          ) : (
            <Button onClick={onNext}>Next</Button>
          )}
        </div>
      </div>
      <Sidebar
        totalQuestions={totalQuestions}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        onQuestionClick={handleQuestionClick}
      />
    </div>
  )
}

