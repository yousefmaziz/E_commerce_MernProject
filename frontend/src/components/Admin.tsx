import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const Admin = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  console.log("AUTH:", auth);
  console.log("ROLE:", auth?.role);
  console.log("IS AUTH:", auth?.isAuthenticated);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (auth.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Admin;
