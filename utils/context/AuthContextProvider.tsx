import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState } from "react";

interface ContextProps {
  token: string | null,
  isAuthenticated: boolean,
  authenticate: (token: string) => void,
  logout: () => void,
}

export const AuthContext = createContext<ContextProps>({
  token: null,
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }: any) {
  const [token, setToken] = useState<null | string>(null);

  function authenticate(token: string) {
    setToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setToken(null);
    AsyncStorage.removeItem('token');
  }

  const value: ContextProps = {
    token: token,
    isAuthenticated: !!token,
    authenticate: authenticate,
    logout: logout,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}