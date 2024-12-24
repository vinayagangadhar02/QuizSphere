import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface QuestionCardProps {
  question: string
  options: string[]
  correctOption: number
}

export default function QuestionCard({ question, options, correctOption }: QuestionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          {options.map((option, index) => (
            <li key={index} className={index === correctOption ? 'font-bold' : ''}>
              {option} {index === correctOption && '(Correct)'}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

