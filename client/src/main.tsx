import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from 'next-themes'
import { AxiosProvider } from './context/AxiosContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <AxiosProvider>
    <ThemeProvider>
    <App />
    </ThemeProvider>
    </AxiosProvider>
  </StrictMode>,
)
