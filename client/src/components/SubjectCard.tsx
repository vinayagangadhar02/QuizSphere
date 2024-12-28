import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SubjectCardProps {
  _id: string
  title: string
  description: string
}

export default function SubjectCard({ _id, title, description }: SubjectCardProps) {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link to={`/add-questions/${_id}`}>
          <Button className='bg-indigo-600 dark:text-white hover:bg-indigo-700'>Add Questions</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
