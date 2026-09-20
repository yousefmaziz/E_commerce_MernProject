import { useState, type PropsWithChildren, type FC } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const API = import.meta.env.VITE_BACK_API;
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("authUsername"),
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken"),
  );

  const [role, setRole] = useState<string | null>(
    localStorage.getItem("authRole"),
  );

  const [myorder, setMyorder] = useState([]);

  const isAuthenticated = !!token;

  // ================= LOGIN =================

  const login = (username: string, token: string, role: string) => {
    setUsername(username);

    setToken(token);

    setRole(role);

    localStorage.setItem("authToken", token);

    localStorage.setItem("authUsername", username);

    localStorage.setItem("authRole", role);
  };

  // ================= LOGOUT =================

  const logout = () => {
    setUsername(null);

    setToken(null);

    setRole(null);

    localStorage.removeItem("authToken");

    localStorage.removeItem("authUsername");

    localStorage.removeItem("authRole");
  };

  // ================= GET MY ORDERS =================

  const getMyorder = async () => {
    try {
      const response = await fetch(`${API}/user/myorder`, {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();

      setMyorder(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        firstName: username,
        role,
        login,
        logout,
        isAuthenticated,
        getMyorder,
        myorder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
