import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!telefono) {
      alert("Por favor ingresa tu número de teléfono");
      return;
    }

    if (!/^3\d{9}$/.test(telefono)) {
      alert("Ingresa un número válido (ej: 3001234567)");
      return;
    }

    alert("Se enviaron instrucciones al correo asociado a tu número de teléfono");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">

        <img src="./public/logo Buscali.jpg.jpg" alt="Logo BusCali" className="logo-top" />

        <h1>Recuperar Contraseña</h1>
        <p>Ingresa tu dirección de correo para continuar</p>

        <input
          type="email"
          placeholder=" tu correo electrónico"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <button className="btn-primary" onClick={handleSubmit}>
          Enviar Código
        </button>

        <button className="btn-secondary" onClick={() => navigate("/")}>
          Volver
        </button>

      </div>
    </div>
  );
};

export default ForgotPassword;








// /*return (
//     // Retorna el JSX de la página
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       {/* Contenedor con padding y centrado */}
//       <h1>Recuperar Contraseña</h1>
//       {/* Título de la página */}
//       <p>Funcionalidad en desarrollo. Contacta al administrador.</p>
//       {/* Mensaje temporal */}
//       <button onClick={() => navigate("/")}>Volver al Login</button>
//       {/* Botón para volver al login */}
//     </div>
// );
// */

// export default ForgotPassword;
// // Exporta el componente por defecto