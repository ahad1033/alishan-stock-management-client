import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children }) {
  // USER DATA
  const currentUser = useSelector((s) => s.auth.user);

  const isAuthenticated = Boolean(currentUser?.user);

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
