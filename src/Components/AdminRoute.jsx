import { Navigate } from "react-router-dom";

function AdminRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default AdminRoute;

