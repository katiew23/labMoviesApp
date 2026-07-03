import React, { useState, useCallback } from "react";

interface AuthContextInterface {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const initialContextState: AuthContextInterface = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = React.createContext<AuthContextInterface>(initialContextState);

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  
  const login = useCallback(() => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  }, []);
  
  const logout = useCallback(() => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  }, []);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
    {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;