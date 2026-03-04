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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Conductores</h1>

      <button onClick={() => navigate("/conductores/registrar")}>
        Registrar Conductor
      </button>

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

      <hr />

      {conductores.length === 0 ? (
        <p>No hay ningún conductor registrado.</p>
      ) : (
        <ul>
          {conductores.map((c) => (
            <li
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              style={{
                cursor: "pointer",
                background: selectedId === c.id ? "#d3e3fd" : "transparent",
                padding: "5px"
              }}
            >
              {c.nombre} - {c.cedula}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate("/")}>
        ← Volver al Inicio
      </button>
    </div>
  );
}