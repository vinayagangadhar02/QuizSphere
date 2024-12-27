'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import SubjectModal from '../../components/SubjectModal'
import SubjectCard from '../../components/SubjectCard'
import { useAxios } from '@/context/AxiosContext'

export default function Home1() {
  const [subjects, setSubjects] = useState<Array<{ _id: string, title: string, description: string }>>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const axios = useAxios()

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/page1')
         setSubjects(response.data)
         console.log(subjects)
      } catch (error) {
        console.error('Error fetching subjects:', error)
      }
    }
    fetchSubjects()
  }, [subjects])

  const addSubject = async (subject: { title: string, description: string }) => {
    try {
      const response = await axios.post('/page1', subject)
      if (response.status === 201) {
        setSubjects([...subjects, response.data])
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding subject:', error)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quiz App</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <SubjectCard key={subject._id} {...subject} />
        ))}
      </div>
      <SubjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addSubject} />
    </main>
  )
}
