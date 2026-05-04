import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import { Outlet } from "react-router-dom";
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
