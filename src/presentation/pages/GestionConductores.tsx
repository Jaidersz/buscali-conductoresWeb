import { useEffect, useState } from "react";
// Importa hooks de React: useEffect para efectos secundarios, useState para estado
import { useNavigate } from "react-router-dom";
// Importa useNavigate para navegación
// import { ConductorMockRepository } from "../../infrastructure/ConductorMockRepository";
// Import comentado: repositorio mock para conductores
import axios from "axios";
// Importa axios para hacer peticiones HTTP
import type { Conductor } from "../../domain/entities/Conductor";
// Importa el tipo Conductor

const API_URL = import.meta.env.VITE_API_URL; //"http://localhost:8080";
// API_URL: obtiene la URL de la API desde variables de entorno, con fallback comentado

export default function GestionConductores() {
  // Define el componente GestionConductores como función exportada por defecto
  const navigate = useNavigate();
  // navigate: función para cambiar de ruta
  //const repository = new ConductorMockRepository();
  // repository comentado: instancia del repositorio mock

  // const repository = useMemo(() => new ConductorMockRepository(), []);
  // repository comentado: versión memoizada del repositorio
  const [conductores, setConductores] = useState<Conductor[]>([]);
  // conductores: estado que almacena el array de conductores, inicializado vacío

  const [selectedCedula, setSelectedCedula] = useState<string | null>(null);
  // selectedCedula: estado para la cédula del conductor seleccionado, puede ser string o null

  const [busqueda, setBusqueda] = useState("");
  // busqueda: estado para el texto de búsqueda, inicializado vacío

  useEffect(() => {
    // useEffect: ejecuta el efecto al montar el componente
    const load = async () => {
      // load: función asíncrona para cargar conductores
      try {
        // try: bloque para manejar errores
        const response = await axios.get(`${API_URL}/conductores`);
        // response: hace petición GET a la API para obtener conductores
        console.log("Conductores cargados:", response.data.data);
        // console.log: imprime en consola los datos cargados
        //Arreglo error
        console.log("API URL:", API_URL);
        // console.log: imprime la URL de la API
        setConductores(response.data.data); // aquí guardas el array
        // setConductores: actualiza el estado con los datos de la respuesta
      } catch (error) {
        // catch: maneja errores de la petición
        console.error("Error cargando conductores:", error);
        // console.error: imprime el error en consola
      }
    };

    load();
    // Llama a la función load
  }, []);
  // []: dependencia vacía, se ejecuta solo al montar

  const handleDelete = async () => {
    // handleDelete: función asíncrona para eliminar conductor
    if (selectedCedula === null) {
      // Verifica si no hay conductor seleccionado
      alert("Seleccione un conductor para eliminar");
      // alert: muestra mensaje al usuario
      return;
      // return: sale de la función
    }
    const seguro = window.confirm("¿Estás seguro de eliminar este conductor?");
    // seguro: confirma con el usuario si quiere eliminar
    if (!seguro) {
      // Si el usuario cancela
      return; // el usuario canceló
      // return: sale de la función
    }

    try {
      // try: bloque para manejar errores
      const API_URL = import.meta.env.VITE_API_URL;
      // API_URL: obtiene la URL de la API
      const response = await axios.delete(
        // response: hace petición DELETE
        `${API_URL}/conductores/${selectedCedula}`,
        // URL con la cédula del conductor
      );
      if (response) {
        // Si hay respuesta
        alert(`El coductor con cedula ${selectedCedula} ha sido eliminado`);
        // alert: muestra mensaje de éxito
      }
      console.log(response);
      // console.log: imprime la respuesta
    } catch (error) {
      // catch: maneja errores
      if (axios.isAxiosError(error)) {
        // Verifica si es error de axios
        // Aquí recibes lo que tu backend mandó
        const status = error.response?.status;
        // status: código de estado HTTP
        const message = error.response?.data.error || "Error en la petición";
        // message: mensaje de error del backend o genérico

        // const message = error.response?.data.error
        if (status === 400) {
          // Si es error 400 (bad request)
          //estas alert's son las que le muestran al usuario los errores, cambiar el alert por un popup u otra cosa mas bonita
          alert(`Error de validación:\n${message}`);
          // alert: muestra error de validación
        } else {
          // Otro error
          alert(message);
          // alert: muestra el mensaje de error
        }
      } else {
        // Error no de axios
        alert("Error inesperado");
        // alert: mensaje genérico
      }
    }

    window.location.reload();
    // Recarga la página para actualizar la lista
  };

  const handleEdit = () => {
    // handleEdit: función para editar conductor
    if (selectedCedula === null) {
      // Verifica si hay conductor seleccionado
      alert("Seleccione un conductor");
      // alert: mensaje si no hay selección
      return;
      // return: sale de la función
    }

    navigate("/conductores/registrar", { state: selectedCedula });
    // navigate: va a la página de registro pasando la cédula como estado
  };

  const conductoresFiltrados = conductores.filter(
    // conductoresFiltrados: filtra los conductores según búsqueda
    (conductor) =>
      // Función de filtro para cada conductor
      conductor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      // Busca en nombre (ignorando mayúsculas)
      String(conductor.cedula).includes(busqueda) ||
      // Busca en cédula
      String(conductor.telefono).includes(busqueda) ||
      // Busca en teléfono
      String(conductor.correo_electronico).includes(busqueda),
    // Busca en correo
    //agregar un delay de 2000 ms donde corresponda
    // Comentario: agregar delay de 2000ms
  );

  return (
    // Retorna el JSX de la página
    <div className="drivers-page">
      {/* Contenedor principal de la página de conductores */}
      <div className="drivers-card">
        <div className="logo-container">
          <img src="./public/Logo BusCali.jpg.jpg" alt="Logo" className="logo-img" />
        </div>
        {/* Tarjeta que contiene todo el contenido */}
        <div className="drivers-header" style={{ padding: "20px" }}>
          {/* Encabezado con padding */}
          <button onClick={() => navigate("/")}>Volver</button>
          {/* Botón para volver a la página principal */}
          <h1>Conductores</h1>
          {/* Título de la página */}

          <button onClick={() => navigate("/conductores/registrar")}>
            {/* Botón para ir a registrar nuevo conductor */}
            Nuevo Conductor
            {/* Texto del botón */}
          </button>
        </div>
        <div className="options">
          {/* Contenedor de opciones */}
          <input
            className="search"
            // Input de búsqueda con clase CSS
            type="text"
            // Tipo texto
            placeholder=" cedula/correo/telefono"
            // Placeholder con icono de lupa
            value={busqueda}
            // Valor ligado al estado busqueda
            onChange={(e) => setBusqueda(e.target.value)}
            // Actualiza busqueda al cambiar el input
          />
          {/* hacer una validacion antes de eliminar
         (estas seguro que deseas eliminar a {}) */}
          {/* Comentario: hacer validación antes de eliminar */}
          <button
            onClick={handleDelete}
            // Botón que llama a handleDelete
            className="btn-delete"
            // Clase CSS para botón de eliminar
            style={{ marginLeft: "10px" }}
            // Estilo inline para margen izquierdo
          >
            Eliminar Conductor
            {/* Texto del botón */}
          </button>

          <button onClick={handleEdit}>Editar Conductor</button>
          {/* Botón para editar conductor */}
        </div>

        <div className="table container">
          <table>
            {/* Tabla para mostrar conductores */}
            <thead>
              {/* Encabezado de la tabla */}
              <tr>
                {/* Fila de encabezado */}
                <th>Cedula</th>
                {/* Columna Cédula */}
                <th>Nombre</th>
                {/* Columna Nombre */}
                <th>Correo</th>
                {/* Columna Correo */}
                <th>Telefono</th>
                {/* Columna Teléfono */}
                <th>Estado</th>
                {/* Columna Estado */}
              </tr>
            </thead>

            <tbody>
              {/* Cuerpo de la tabla */}
              {conductoresFiltrados.length === 0 ? (
                // Renderizado condicional: si no hay conductores
                <tr>
                  {/* Fila única */}
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    {/* Celda que ocupa 5 columnas, centrada */}
                    No hay conductores registrados
                    {/* Mensaje cuando no hay datos */}
                  </td>
                </tr>
              ) : (
                // Si hay conductores
                conductoresFiltrados.map((conductor, index) => (
                  // Mapea cada conductor a una fila
                  <tr
                    key={index}
                    // key: identificador único para React
                    onClick={() => setSelectedCedula(conductor.cedula)}
                    // Al hacer clic, selecciona la cédula
                    className={
                      selectedCedula === conductor.cedula ? "selected-row" : ""
                    }
                  >
                    <td>{conductor.cedula}</td>
                    {/* Celda con cédula */}
                    <td>{conductor.nombre}</td>
                    {/* Celda con nombre */}
                    <td>{conductor.correo_electronico}</td>
                    {/* Celda con correo */}
                    <td>{conductor.telefono}</td>
                    {/* Celda con teléfono */}
                    <td>{conductor.estado}</td>
                    {/* Celda con estado */}

                    {/* <td>
      <button onClick={() => setSelectedCedula(conductor.cedula)} style={{ marginRight: "5px" }}>
        Seleccionar
      </button> 
     </td> */}
                    {/* Código comentado: botón para seleccionar */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
