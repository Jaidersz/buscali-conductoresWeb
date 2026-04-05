import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const isAuth = true; // 👈 aquí luego validas login real

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;