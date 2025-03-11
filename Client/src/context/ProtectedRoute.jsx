import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Cargando...</div>; // 🔥 No redirigir mientras carga

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
