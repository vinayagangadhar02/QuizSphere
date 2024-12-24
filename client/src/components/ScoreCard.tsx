import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface ScoreCardProps {
  score: number
  totalQuestions: number
  subject: string
}

export default function ScoreCard({ score, totalQuestions, subject }: ScoreCardProps) {
  const percentage = (score / totalQuestions) * 100

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return 'A'
    if (percentage >= 80) return 'B'
    if (percentage >= 70) return 'C'
    if (percentage >= 60) return 'D'
    return 'F'
  }

  const getFeedback = (percentage: number) => {
    if (percentage >= 90) return 'Excellent work! You\'ve mastered this subject.'
    if (percentage >= 80) return 'Great job! You have a strong understanding of the material.'
    if (percentage >= 70) return 'Good effort! There\'s room for improvement, but you\'re on the right track.'
    if (percentage >= 60) return 'You passed, but consider reviewing the material to strengthen your knowledge.'
    return 'Don\'t be discouraged. With more study, you\'ll improve your score next time.'
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center mb-2">{subject} Quiz Results</CardTitle>
        <CardDescription className="text-center text-lg">
          Here's how you performed on the quiz
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="w-48 h-48">
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}%`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
              textColor: '#3e98c7',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
        <div className="text-center">
          <span className="text-6xl font-bold">{getGrade(percentage)}</span>
          <p className="text-xl mt-2">Grade</p>
        </div>
        <p className="text-center text-lg">{getFeedback(percentage)}</p>
      </CardContent>
    </Card>
  )
}

