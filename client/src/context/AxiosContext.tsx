import { createContext, useContext, ReactNode } from 'react';
import axiosInstance from '../api/axios'; 

type AxiosContextType = typeof axiosInstance;

const AxiosContext = createContext<AxiosContextType | null>(null);

interface AxiosProviderProps {
  children: ReactNode;
}

export const AxiosProvider = ({ children }: AxiosProviderProps) => {
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = (): AxiosContextType => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider');
  }
  return context;
};
