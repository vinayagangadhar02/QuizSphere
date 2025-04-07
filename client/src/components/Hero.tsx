import { useEffect } from 'react';
import {Link} from 'react-router-dom'

const Hero = () => {

  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('questions-')) {
        localStorage.removeItem(key);
      }
      else if(key.startsWith('quizAnswers')){
        localStorage.removeItem(key);
      }
      else if(key.startsWith('quizStart')){
        localStorage.removeItem(key);
      }
    });
  }, []);
  
  return (
    <section id="home" className="bg-gray-100 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-indigo-600 dark:text-indigo-400">Quiz App</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Test your knowledge with our amazing quizzes! Challenge yourself and learn new things.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/user-signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

