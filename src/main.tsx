import React from "react";
// Importa la biblioteca React para crear componentes
import ReactDOM from "react-dom/client";
// Importa ReactDOM para renderizar la aplicación en el DOM
import App from "./App";
// Importa el componente principal App
import "./index.css";
// Importa los estilos globales de index.css
import "./infrastructure/axiosConfig"; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  // createRoot crea el punto de entrada de React en el elemento con id "root"
  // document.getElementById("root") obtiene el elemento del DOM
  // ! asegura que no es null
  // .render() renderiza el componente en el DOM
  <React.StrictMode>
    {/* StrictMode ayuda a detectar problemas en el código durante desarrollo */}
    <App />
    {/* Renderiza el componente App dentro de StrictMode */}
  </React.StrictMode>
);