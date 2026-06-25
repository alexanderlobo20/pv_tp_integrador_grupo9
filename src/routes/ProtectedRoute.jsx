import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAdmin();

  if (loading) return <p>Cargando...</p>;

  if (!admin) return <Navigate to="/login" replace />;

  return children;
}