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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;