import { useEffect, /*useMemo*/ useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ConductorMockRepository } from "../../infrastructure/ConductorMockRepository";
import axios from "axios";
 import type { Conductor } from "../../domain/entities/Conductor";

 const API_URL = import.meta.env.VITE_API_URL;

export default function GestionConductores() {

  const navigate = useNavigate();
  //const repository = new ConductorMockRepository();


  // const repository = useMemo(() => new ConductorMockRepository(), []);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  // const [selectedCedula, setSelectedCedula] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(`${API_URL}/conductores`);
        console.log("Conductores cargados:", response.data);
        setConductores(response.data); // aquí guardas el array
      } catch (error) {
        console.error("Error cargando conductores:", error);
      }
    };
  
    load();
  }, []);

  // const handleDelete = async () => {
  //   if (selectedCedula === null) {
  //     alert("Seleccione un conductor");
  //     return;
  //   }

  //   await repository.delete(selectedCedula);

  //   const updated = await repository.getAll();
  //   setConductores(updated);
  // };

  // const handleEdit =  () => {
  //   if (selectedcedula === null) {
  //     alert("Seleccione un conductor");
  //     return;
  //   }
  //   const selectedConductor = conductores.find(c => c.cedula === selectedcedula);
  //   if (!selectedConductor) return;
  //   navigate("/conductores/registrar", { state: selectedConductor });

  // };

  const conductoresFiltrados = conductores.filter((conductor) =>
    conductor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    String(conductor.cedula).includes(busqueda) ||
    String(conductor.telefono).includes(busqueda)
  );
  

  return (
    <div className="drivers-page">
    <div className="drivers-card">
    <div className="drivers-header"
      
    
    
       style={{ padding: "20px" }}>
      <h1>Conductores</h1>
      
      
      <button onClick={() => navigate("/")}>
        ← Volver al Inicio
      </button>
      

      <button onClick={() => navigate("/conductores/registrar")}>
        Registrar Conductor
      </button>
      </div>
       <input className="search" type="text" 
       placeholder="Buscar conductor"
       value={busqueda}
       onChange={(e) => setBusqueda(e.target.value)}
       />
      <button
        // onClick={handleDelete}
        style={{ marginLeft: "10px" }}
      >
        Eliminar Conductor
      </button>

      <button
        // onClick={handleEdit}
        style={{ marginLeft: "10px" }}
      >
        Editar Conductor
      </button>

      
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
      
     
     <tr key={index}>
     
     <td>{conductor.cedula}</td>
     <td>{conductor.nombre}</td>
     <td>{conductor.correo_electronico}</td> 
     <td>{conductor.telefono}</td>
     <td>{conductor.estado}</td>

     <td>
      {/* <button onClick={() => setSelectedCedula(conductor.cedula)} style={{ marginRight: "5px" }}>
        Seleccionar
      </button>*/ }
     </td>

     </tr>

     
      )
      ))
      
      }
     </tbody>
     </table>


    </div>
    </div>

  
  
   
  );
}