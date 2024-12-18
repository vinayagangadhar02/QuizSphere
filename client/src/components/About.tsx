export default function AboutUs() {
    return (
      <div id="about" className="bg-white dark:bg-gray-800 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">About Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Empowering Knowledge Through Quizzes
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              At QuizApp, we believe in the power of knowledge and the joy of learning. Our mission is to create an engaging platform where users can test their knowledge, learn new facts, and challenge themselves across various topics.
            </p>
          </div>
  
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Wide Range of Topics</dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-300">From history to science, literature to pop culture, we offer quizzes on a diverse array of subjects to cater to all interests.</dd>
                </div>
              </div>
  
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Competitive Edge</dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-300">Compete with friends or challenge yourself to beat your own high scores. Our leaderboards keep the competition exciting!</dd>
                </div>
              </div>
  
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">User-Friendly Interface</dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-300">Our platform is designed with ease of use in mind, making it simple for anyone to start quizzing and learning right away.</dd>
                </div>
              </div>
  
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c4.418 0 8 2.686 8 6s-3.582 6-8 6-8-2.686-8-6 3.582-6 8-6z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Learning Made Fun</dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-gray-300">We combine learning with fun and friendly competition, making it an enjoyable experience for users of all ages.</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  }
  