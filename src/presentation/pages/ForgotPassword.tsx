import { useNavigate } from "react-router-dom";
// Importa useNavigate para navegación

const ForgotPassword = () => {
  // Define el componente ForgotPassword
  const navigate = useNavigate();
  // navigate: función para cambiar de ruta

  return (
    // Retorna el JSX de la página
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Contenedor con padding y centrado */}
      <h1>Recuperar Contraseña</h1>
      {/* Título de la página */}
      <p>Funcionalidad en desarrollo. Contacta al administrador.</p>
      {/* Mensaje temporal */}
      <button onClick={() => navigate("/")}>Volver al Login</button>
      {/* Botón para volver al login */}
    </div>
  );
};

export default ForgotPassword;
// Exporta el componente por defecto