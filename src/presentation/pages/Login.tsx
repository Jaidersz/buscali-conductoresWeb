// Importamos hooks de React
import { useState } from "react"; 
// useState → permite guardar datos (estado) dentro del componente

// Importamos navegación entre páginas
import { useNavigate } from "react-router-dom"; 
// useNavigate → permite redirigir a otra vista (ej: después del login)

import axios from "axios";
// axios → biblioteca para hacer peticiones HTTP (aunque no se usa en este código aún)


export default function Login() {
  // Definimos el componente funcional Login como exportación por defecto
  const navigate = useNavigate();
  // navigate → función que permite cambiar de ruta en la aplicación

  // Estado para guardar el teléfono que escribe el usuario
  const [telefono, setTelefono] = useState("");
  // useState("") → inicializa el estado con una cadena vacía
  // telefono → variable que contiene el valor actual del estado
  // setTelefono → función para cambiar el valor del estado

  // Estado para guardar la contraseña
  const [password, setPassword] = useState("");
  // password → almacena el valor del input de contraseña
  // setPassword → función para actualizar el estado de la contraseña

  // Estado para mostrar mensajes de error
  const [error, setError] = useState("");
  // error → almacena el mensaje de error a mostrar
  // setError → función para actualizar el mensaje de error

  // Estado para saber si el usuario quiere ser recordado
  const [remember, setRemember] = useState(false);
  // remember → booleano que indica si el usuario marcó "Recordarme"
  // setRemember → función para cambiar el estado de recordar

  //  Datos simulados (mock)
  // Esto reemplaza temporalmente al backend
  //const usuarioMock = {
  //  telefono: "3001234567", // Número de teléfono simulado para login
  //  password: "1234", // Contraseña simulada para login
  //};

  // Función que se ejecuta al enviar el formulario
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!telefono || !password) {
    setError("Todos los campos son obligatorios");
    return;
  }

  try {
    // baseURL = VITE_API_URL en axiosConfig; el API real está bajo /api/v1/conductores
    const response = await axios.post("/api/v1/conductores/login", {
      telefono,
      contrasena: password,
    });

    // Si la petición es exitosa (el back-end devuelve 200), guarda sesión y redirige
    if (response.status === 200) {
      const token =
        (response.data as { data?: { token?: string } })?.data?.token ??
        response.data?.token;
      if (token) localStorage.setItem("authToken", token);
      else localStorage.setItem("authToken", "cookie-session");
      navigate("/conductores");
    } else {
      setError("Respuesta inválida del servidor");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        setError(
          "No hay respuesta del servidor. Comprueba que el backend esté en marcha y que VITE_API_URL en .env sea el mismo puerto (ej. http://localhost:3001). Reinicia \"npm run dev\" del front tras cambiar .env."
        );
        return;
      }
      const status = error.response.status;
      const body = error.response.data as {
        message?: string;
        errors?: string[];
      };
      const detail =
        (Array.isArray(body?.errors) && body.errors.join(" ")) ||
        body?.message ||
        "";
      if (status === 401) {
        setError(detail || "Teléfono o contraseña incorrectos");
      } else if (status === 400) {
        setError(detail ? `Validación: ${detail}` : "Datos inválidos");
      } else if (status === 404) {
        setError(
          "Ruta del API no encontrada (404). Revisa que VITE_API_URL apunte al backend correcto."
        );
      } else {
        setError(detail || `Error del servidor (${status})`);
      }
    } else {
      setError("Error inesperado. Inténtalo de nuevo.");
    }
  }
};

  return (
    <>
      <div className="background-blur"></div>
      

      {/* Contenedor principal (fondo + centrado) */}
      <div className="login-container">
        

        {/* Tarjeta del login */}
        <div className="login-card">
          
          {/* Imagen circular en la parte superior */}
          <img
            src="./public/Logo BusCali.jpg.jpg"
            // src: ruta de la imagen (reemplazarla con la ruta correcta)
            
            // alt: texto alternativo si la imagen no carga
            className="login-logo"
            // className: clase CSS para estilos de imagen circular
          />

          {/* Formulario */}
          <form onSubmit={handleLogin}>
          

          {/* 📱 Input de teléfono */}
          <div className="input-group">
            
            <span className="icon"></span>
            {/* Icono visual del teléfono */}

            <input
              type="text"
              // Tipo de input: texto (permite ingresar caracteres alfanuméricos)
              placeholder="Teléfono"
              // Texto que aparece cuando el input está vacío
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
            
            <span className="icon"></span>
            {/* Icono visual de candado */}

            <input
              type="password"
              // Tipo de input: contraseña (oculta los caracteres con puntos o asteriscos)
              placeholder="********"
              // Placeholder con asteriscos para indicar campo de contraseña
              value={password}
              // Muestra el valor actual

              onChange={(e) => setPassword(e.target.value)}
              // Guarda lo que escribe el usuario en el estado password
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
                // Tipo checkbox para selección binaria
                checked={remember}
                // Estado del checkbox ligado a remember

                onChange={() => setRemember(!remember)}
                // Cambia entre true/false al hacer clic
              />
              Recordarme
              
            </label>

             
          

            <span className="forgot" onClick={() => navigate("/forgot-password")}>
              
              ¿Olvidaste tu contraseña?
              
            </span>
          </div>

         
         

        

          {/* 🔘 Botón */}
          <button type="submit" className="login-btn">
            
            Iniciar Sesión
            
          </button>
          {/* type="submit" → activa el onSubmit del form, ejecutando handleLogin */}


        </form>
      </div>
    </div>
    </>
  );
}

