import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/ColorContext/ColorContext'

const Navbar = () => {
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

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }



  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="w-full p-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Quiz App
            </Link>
          </div>
          <div className="flex  items-center">
            <button onClick={() => scrollTo('home')} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </button>
            <button onClick={() => scrollTo('about')} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </button>
            <button onClick={() => scrollTo('contact')} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
              Contact Us
            </button>
            <Link to="/user-signup" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
             Sign Up
            </Link>
            <Link to="/user-login" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
             Login
            </Link>
            <Link to="/admin-login" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
             Admin
            </Link>
            
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
            >
              {mounted && (theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
