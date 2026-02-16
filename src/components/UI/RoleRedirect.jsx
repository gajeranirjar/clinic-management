import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../layout/Loading";

const RoleRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  const routes = {
    admin: "/admin",
    doctor: "/doctor",
    receptionist: "/receptionist",
    user: "/user",
  };

  return <Navigate to={routes[user.role] || "/"} replace />;
};

export default RoleRedirect;
