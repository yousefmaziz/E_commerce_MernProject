import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  myorder: any[];
  login: (username: string, token: string) => void;
  logout?: () => void;
  getMyOrder: () => void;
}
export const AuthContext = createContext<AuthContextType | null>({
  username: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  getMyOrder: () => {},
  myorder: [],
});

export const useAuth = () => useContext(AuthContext);
