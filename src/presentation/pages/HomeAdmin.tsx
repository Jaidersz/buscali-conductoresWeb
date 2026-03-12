import { useNavigate } from "react-router-dom";

const HomeAdmin = () => {
  const navigate = useNavigate();

  return (
    
    <div className="home-hero">
      <div className="hero-overlay">
        <h1>Panel de Administración</h1>
        
        <p>Bienvenido al panel de administración de BusCali</p>
      <button className="btn-primary>" onClick={() => navigate("/conductores")}>
        Gestionar Conductores
      </button>
    </div>
    </div>
  );
};

export default HomeAdmin;