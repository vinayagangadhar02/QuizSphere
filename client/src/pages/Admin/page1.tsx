'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import SubjectModal from '../../components/SubjectModal'
import SubjectCard from '../../components/SubjectCard'
import { useAxios } from '@/context/AxiosContext'
import { Link } from 'react-router-dom'
import { useTheme } from '@/ColorContext/ColorContext'
import { Sun, Moon } from 'lucide-react'
import { useLogout } from '@/LogoutContext/LogoutContext'

export default function Home1() {
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
  
   
  
  const [subjects, setSubjects] = useState<Array<{ _id: string, title: string, description: string }>>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const axios = useAxios()

  

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/subject')
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
      const response = await axios.post('/subject', subject)
      if (response.status === 201) {
        setSubjects([...subjects, response.data])
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding subject:', error)
    }
  }

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
        <div className="ml-auto flex items-center">
          <div className='mx-5'>
        <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
            >
              {mounted && (theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
            </button>
            </div>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center bg-indigo-600 dark:text-white w-full flex items-center justify-center px-5 py-3 border border-transparent text-base  rounded-md text-white bg-indigo-600 hover:bg-indigo-700  ">
            <PlusCircle className="mr-2 h-4 w-4 " />
            Add Subject
          </Button>
        </div>
        <div >
          <Button onClick={logout} className='mx-5 '>Logout</Button>
        </div>
      </div>
    </div>
  </nav>
    <main className="container mx-auto p-4">
 

      <div className="grid grid-cols-1 my-10 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <SubjectCard key={subject._id} {...subject} />
        ))}
      </div>
      <SubjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addSubject} />
    </main>
    </>
  )
}
