import { Button } from '@/components/ui/button'

interface SidebarProps {
  totalQuestions: number
  currentQuestionIndex: number
  answers: (string | null)[]
  onQuestionClick: (index: number) => void
}

export default function Sidebar({ totalQuestions, currentQuestionIndex, answers, onQuestionClick }: SidebarProps) {
  return (
    <div className="w-64 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4 text-center">Questions</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <Button
            key={index}
            variant={index === currentQuestionIndex ? 'default' : 'outline'}
            className={`
              ${answers[index] ? 'bg-green-500 hover:bg-green-600 text-white' : ''}
              ${index === currentQuestionIndex ? 'ring-2 ring-blue-500' : ''}
              transition-all duration-200 ease-in-out transform hover:scale-105
            `}
            onClick={() => onQuestionClick(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

