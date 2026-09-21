import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const Admin = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();


  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (auth.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Admin;
