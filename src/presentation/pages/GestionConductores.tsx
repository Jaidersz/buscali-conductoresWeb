import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConductorMockRepository } from "../../infrastructure/ConductorMockRepository";
import type { Conductor } from "../../domain/entities/Conductor";

export default function GestionConductores() {

  const navigate = useNavigate();
  //const repository = new ConductorMockRepository();


  const repository = useMemo(() => new ConductorMockRepository(), []);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await repository.getAll();
      console.log("Conductores cargados:", data);
      setConductores(data);
    };

    load();
  }, [repository]);

  const handleDelete = async () => {
    if (selectedId === null) {
      alert("Seleccione un conductor");
      return;
    }

    await repository.delete(selectedId);

    const updated = await repository.getAll();
    setConductores(updated);
  };

  const handleEdit =  () => {
    if (selectedId === null) {
      alert("Seleccione un conductor");
      return;
    }
    const selectedConductor = conductores.find(c => c.id === selectedId);
    if (!selectedConductor) return;
    navigate("/conductores/registrar", { state: selectedConductor });

  };

  const conductoresFiltrados = conductores.filter((conductor) =>
  conductor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  String(conductor.celular).includes(busqueda) ||
  String(conductor.cedula).includes(busqueda) 
  //String(conductor.id).includes(busqueda) ||
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
        onClick={handleDelete}
        style={{ marginLeft: "10px" }}
      >
        Eliminar Conductor
      </button>

      <button
        onClick={handleEdit}
        style={{ marginLeft: "10px" }}
      >
        Editar Conductor
      </button>

      
  <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Celular</th>
      <th>Correo</th>
      <th>Licencia</th>
      <th>Acciones</th>
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
     
     <td>{conductor.id}</td>
     <td>{conductor.nombre}</td>
     <td>{conductor.celular}</td> 
     <td>{conductor.correo}</td>
     <td>{conductor.licencia}</td>

     <td>
      <button onClick={() => setSelectedId(conductor.id)} style={{ marginRight: "5px" }}>
        Seleccionar
      </button>
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