import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;

  token: string | null;

  role: string | null;

  isAuthenticated: boolean;

  myorder: any[];

  login: (username: string, token: string, role: string) => void;

  logout?: () => void;

  getMyorder: () => void;
}

export const AuthContext = createContext<AuthContextType | null>({
  username: null,

  token: null,

  role: null,

  isAuthenticated: false,

  login: () => {},

  logout: () => {},

  getMyorder: () => {},

  myorder: [],
});

export const useAuth = () => useContext(AuthContext);
