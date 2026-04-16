import { useNavigate } from "react-router-dom";
// Importa useNavigate para navegación programática

const HomeAdmin = () => {
  // Define el componente HomeAdmin como función
  const navigate = useNavigate();
  // navigate: función para cambiar de ruta

  return (
    // Retorna el JSX de la página de inicio del admin
    <div className="home-hero">
      {/* Contenedor principal con clase CSS para el hero */}
      <div className="hero-overlay">
        <div className="admin-card">
          <h1>Panel de Administración</h1>
          <p>Bienvenido al panel de administración de BusCali</p>

          <button
            className="btn-primary"
            onClick={() => navigate("/conductores")}
          >
             Gestionar Conductores
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
// Exporta HomeAdmin como componente por defecto
