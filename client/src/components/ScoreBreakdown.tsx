import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface ScoreBreakdownProps {
  score: number
  totalQuestions: number
}

export default function ScoreBreakdown({ score, totalQuestions }: ScoreBreakdownProps) {
  const correctPercentage = (score / totalQuestions) * 100
  const incorrectPercentage = 100 - correctPercentage

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>Correct Answers</span>
            <span>{score} / {totalQuestions}</span>
          </div>
          <Progress value={correctPercentage} className="h-3" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Incorrect Answers</span>
            <span>{totalQuestions - score} / {totalQuestions}</span>
          </div>
          <Progress value={incorrectPercentage} className="h-3" />
        </div>
      </CardContent>
    </Card>
  )
}

