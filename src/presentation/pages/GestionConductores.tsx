import { useEffect, /*useMemo*/ useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ConductorMockRepository } from "../../infrastructure/ConductorMockRepository";
import axios from "axios";
import type { Conductor } from "../../domain/entities/Conductor";

const API_URL = import.meta.env.VITE_API_URL; //"http://localhost:8080"; 

export default function GestionConductores() {
  const navigate = useNavigate();
  //const repository = new ConductorMockRepository();

  // const repository = useMemo(() => new ConductorMockRepository(), []);
  const [conductores, setConductores] = useState<Conductor[]>([]);

  const [selectedCedula, setSelectedCedula] = useState<string | null>(null);

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(`${API_URL}/conductores`);
        console.log("Conductores cargados:", response.data);
        //Arreglo error
        console.log("API URL:", API_URL);
        setConductores(response.data); // aquí guardas el array
      } catch (error) {
        console.error("Error cargando conductores:", error);
      }
    };

    load();
  }, []);

  const handleDelete = async () => {
    if (selectedCedula === null) {
      alert("Seleccione un conductor para eliminar");
      return;
    }
    const seguro = window.confirm("¿Estás seguro de eliminar este conductor?");
    if (!seguro) {
      return; // el usuario canceló
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.delete(
        `${API_URL}/conductores/${selectedCedula}`,
      );
      if (response) {
        alert(`El coductor con cedula ${selectedCedula} ha sido eliminado`);
      }
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Aquí recibes lo que tu backend mandó
        const status = error.response?.status;
        const message = error.response?.data.error || "Error en la petición";

        // const message = error.response?.data.error
        if (status === 400) {
          //estas alert's son las que le muestran al usuario los errores, cambiar el alert por un popup u otra cosa mas bonita
          alert(`Error de validación:\n${message}`);
        } else {
          alert(message);
        }
      } else {
        alert("Error inesperado");
      }
    }

    window.location.reload();
  };

  const handleEdit = () => {
    if (selectedCedula === null) {
      alert("Seleccione un conductor");
      return;
    }

    navigate("/conductores/registrar", { state: selectedCedula });
  };

  const conductoresFiltrados = conductores.filter(
    (conductor) =>
      conductor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      String(conductor.cedula).includes(busqueda) ||
      String(conductor.telefono).includes(busqueda) ||
      String(conductor.correo_electronico).includes(busqueda),
    //agregar un delay de 2000 ms donde corresponda
  );

  return (
    <div className="drivers-page">
      <div className="drivers-card">
        <div className="drivers-header" style={{ padding: "20px" }}>
          <button onClick={() => navigate("/")}>Volver</button>
          <h1>Conductores</h1>

          <button onClick={() => navigate("/conductores/registrar")}>
            Nuevo Conductor
          </button>
        </div>
        <div className="options">
          <input
            className="search"
            type="text"
            placeholder="🔎 cedula/correo/telefono"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {/* hacer una validacion antes de eliminar
         (estas seguro que deseas eliminar a {}) */}
          <button
            onClick={handleDelete}
            className="btn-delete"
            style={{ marginLeft: "10px" }}
          >
            Eliminar Conductor
          </button>

          <button onClick={handleEdit}>Editar Conductor</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Cedula</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {conductoresFiltrados.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No hay conductores registrados
                </td>
              </tr>
            ) : (
              conductoresFiltrados.map((conductor, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedCedula(conductor.cedula)}
                >
                  <td>{conductor.cedula}</td>
                  <td>{conductor.nombre}</td>
                  <td>{conductor.correo_electronico}</td>
                  <td>{conductor.telefono}</td>
                  <td>{conductor.estado}</td>

                  {/* <td>
      <button onClick={() => setSelectedCedula(conductor.cedula)} style={{ marginRight: "5px" }}>
        Seleccionar
      </button> 
     </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
