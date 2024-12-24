'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import SubjectModal from '../../components/SubjectModal'
import SubjectCard from '../../components/SubjectCard'

export default function Home1() {
  const [subjects, setSubjects] = useState<Array<{ id: number, title: string, description: string }>>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addSubject = (subject: { title: string, description: string }) => {
    setSubjects([...subjects, { id: Date.now(), ...subject }])
    setIsModalOpen(false)
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
          <SubjectCard key={subject.id} {...subject} />
        ))}
      </div>
      <SubjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addSubject} />
    </main>
  )
}

