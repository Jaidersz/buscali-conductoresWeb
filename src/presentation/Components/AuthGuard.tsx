import { Navigate, Outlet } from "react-router-dom";
// Importa Navigate para redirigir y Outlet para renderizar rutas anidadas

const AuthGuard = () => {
  // Define el componente AuthGuard como función
  const token = localStorage.getItem("authToken");
  const isAuth = Boolean(token);
  // isAuth: valida si existe un token de sesión en localStorage

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
  // Si está autenticado, renderiza Outlet (las rutas protegidas)
  // Si no, redirige a /login usando Navigate
};

export default AuthGuard;
// Exporta AuthGuard como componente por defecto