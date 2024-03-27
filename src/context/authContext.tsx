import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');

  };

  const logout = () => {
    setIsAuthenticated(false);
    console.log('logout')
    localStorage.setItem('isLoggedIn', 'false');

  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
  };

  return (
   <AuthContext.Provider value={authContextValue}>
    {children}
   </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
