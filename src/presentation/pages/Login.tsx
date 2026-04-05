// Importamos hooks de React
import { useState } from "react"; 
// useState → permite guardar datos (estado) dentro del componente

// Importamos navegación entre páginas
import { useNavigate } from "react-router-dom"; 
// useNavigate → permite redirigir a otra vista (ej: después del login)

import axios from "axios";


export default function Login() {
  // Creamos función para redireccionar
  const navigate = useNavigate();

  // Estado para guardar el teléfono que escribe el usuario
  const [telefono, setTelefono] = useState("");

  // Estado para guardar la contraseña
  const [password, setPassword] = useState("");

  // Estado para mostrar mensajes de error
  const [error, setError] = useState("");

  // Estado para saber si el usuario quiere ser recordado
  const [remember, setRemember] = useState(false);

  //  Datos simulados (mock)
  // Esto reemplaza temporalmente al backend
  const usuarioMock = {
    telefono: "3001234567",
    password: "1234",
  };

  // Función que se ejecuta al enviar el formulario
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 
    // Evita que la página se recargue al enviar el formulario

    // 🔹 Validación: campos vacíos
    if (!telefono || !password) {
      setError("Todos los campos son obligatorios");
      return; // Detiene la ejecución
    }

    // 🔹 Validación de formato del teléfono
    const telefonoValido = /^[0-9]{10}$/.test(telefono);
    // Explicación:
    // ^ inicio
    // [0-9] solo números
    // {10} exactamente 10 dígitos
    // $ fin

    if (!telefonoValido) {
      setError("Ingrese un número de teléfono válido (10 dígitos)");
      return;
    }

    // 🔹 Validación de credenciales
    const esValido =
      telefono === usuarioMock.telefono &&
      password === usuarioMock.password;
    // Compara lo que escribió el usuario con los datos simulados

    if (!esValido) {
      setError("Teléfono o contraseña incorrectos");
      return;
    }

    // 🔹 Guardar sesión (simulación de autenticación)
    if (remember) {
      localStorage.setItem("auth", "true");
      // localStorage → guarda datos incluso si se cierra el navegador
    } else {
      sessionStorage.setItem("auth", "true");
      // sessionStorage → se borra al cerrar el navegador
    }

    // Redirige al usuario al home después de login exitoso
    navigate("/Home");
  };

  return (
    <>
      <div className="background-blur"></div>

  
      {/* Contenedor principal (fondo + centrado) */}
    <div className="login-container">

      {/* Tarjeta del login */}
      <div className="login-card">

        {/* Formulario */}
        <form onSubmit={handleLogin}>

          {/* 📱 Input de teléfono */}
          <div className="input-group">
            <span className="icon">📱</span>
            {/* Icono visual */}

            <input
              type="text"
              placeholder="Teléfono"
              value={telefono} 
              // Muestra el valor actual del estado

              onChange={(e) =>
                setTelefono(e.target.value.replace(/\D/g, ""))
              }
              // Cada vez que escribe:
              // e.target.value → lo que el usuario escribe
              // replace(/\D/g, "") → elimina TODO lo que NO sea número
            />
          </div>

          {/* 🔒 Input de contraseña */}
          <div className="input-group">
            <span className="icon">🔒</span>

            <input
              type="password"
              placeholder="********"
              value={password}
              // Muestra el valor actual

              onChange={(e) => setPassword(e.target.value)}
              // Guarda lo que escribe el usuario
            />
          </div>

          {/* ❌ Mensaje de error */}
          {error && <p className="error">{error}</p>}
          {/* Solo se muestra si hay error (renderizado condicional) */}

          {/* ⚙️ Opciones */}
          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                // Estado del checkbox

                onChange={() => setRemember(!remember)}
                // Cambia entre true/false
              />
              Recordarme
            </label>

             
          

            <span className="forgot">
              ¿Olvidaste tu contraseña?
            </span>
          </div>

         
         

        

          {/* 🔘 Botón */}
          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
          {/* type="submit" → activa el onSubmit del form */}

        </form>
      </div>
    </div>
    </>
  );
}