import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importa componentes de React Router para manejar el enrutamiento de la aplicación
import HomeAdmin from "./presentation/pages/HomeAdmin";
// Importa el componente de la página de inicio del administrador
import GestionConductores from "./presentation/pages/GestionConductores";
// Importa el componente para gestionar conductores
import RegistrarConductor from "./presentation/pages/RegistrarConductor";
// Importa el componente para registrar un nuevo conductor
import Login from "./presentation/pages/Login";
// Importa el componente de la página de login
import ForgotPassword from "./presentation/pages/ForgotPassword";
// Importa el componente de recuperación de contraseña
import AuthGuard from "./presentation/Components/AuthGuard.tsx";
// Importa el componente de guardia de autenticación

function App() {
  // Define el componente principal de la aplicación
  return (
    // Retorna el JSX que define la estructura de la aplicación
    <BrowserRouter>
      {/* BrowserRouter envuelve la aplicación para habilitar el enrutamiento */}
      <Routes>
        {/* Routes contiene todas las rutas definidas */}
        <Route path="/" element={<Login />} />
        {/* Ruta raíz que muestra el componente Login */}
        <Route path="/login" element={<Login />} />
        {/* Ruta /login que también muestra el componente Login */}
        
        <Route element={AuthGuard()} />
        {/* Ruta que usa AuthGuard como layout para proteger rutas anidadas */}

        <Route path="/Home" element={<HomeAdmin />} />
        {/* Ruta /Home que muestra el componente HomeAdmin */}
        <Route path="/conductores" element={<GestionConductores />} />
        {/* Ruta /conductores que muestra el componente GestionConductores */}
        <Route path="/conductores/registrar" element={<RegistrarConductor />} />
        {/* Ruta /conductores/registrar que muestra el componente RegistrarConductor */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Ruta /forgot-password que muestra el componente ForgotPassword */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// Exporta el componente App como exportación por defecto
/*
Inicializar con npm run dev
// Comentario que indica cómo iniciar la aplicación en modo desarrollo
*/