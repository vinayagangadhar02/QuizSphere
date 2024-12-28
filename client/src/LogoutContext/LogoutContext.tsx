import React, { createContext, useState, useContext, ReactNode } from 'react';


interface LogoutContextType {
  isAuthenticated: boolean;
  logout: () => void;
}


const LogoutContext = createContext<LogoutContextType | undefined>(undefined);


interface LogoutProviderProps {
  children: ReactNode;
}

export const LogoutProvider: React.FC<LogoutProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
      localStorage.removeItem('token'); 
      setIsAuthenticated(false); 
      window.location.href = '/';
    }
  };

  return (
    <LogoutContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </LogoutContext.Provider>
  );
};


export const useLogout = (): LogoutContextType => {
  const context = useContext(LogoutContext);
  
  if (!context) {
    throw new Error('useLogout must be used within a LogoutProvider');
  }

  return context;
};
