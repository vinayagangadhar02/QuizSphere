import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './ColorContext/ColorContext.tsx'
import { LogoutProvider } from './LogoutContext/LogoutContext'; 
import { QuizProvider } from './QuizContext/QuizContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     
     <ThemeProvider>
     <QuizProvider>
      <LogoutProvider>
     
   
    <App />
   
  
    </LogoutProvider>
    </QuizProvider>
    </ThemeProvider>
  </StrictMode>,
)
