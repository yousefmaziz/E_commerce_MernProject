import { useState, type PropsWithChildren, type FC } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("authUsername"),
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken"),
  );
  const [myorder, setMyorder] = useState([]);
  const isAuthenticated = !!token;

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUsername", username);
  };
  const logout = () => {
    setUsername(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUsername");
  };
  const getMyorder = async () => {
    const response = await fetch("http://localhost:3002/user/myorder", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(!response.ok) return;
    const data = await response.json();
  };
  return (
    <AuthContext.Provider
      value={{ username, token, login, logout, isAuthenticated, getMyorder,myorder }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
