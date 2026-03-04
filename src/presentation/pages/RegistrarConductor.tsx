import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConductorMockRepository } from "../../infrastructure/ConductorMockRepository";
import type { Conductor } from "../../domain/entities/Conductor";
import { useLocation } from "react-router-dom";

export default function RegistrarConductor() {

  const location = useLocation();
  const conductorToEdit = location.state as Conductor | undefined;

  const navigate = useNavigate();
  const repository = new ConductorMockRepository();

  const [form, setForm] = useState({
  id: conductorToEdit?.id ?? 0,
  nombre: conductorToEdit?.nombre ?? "",
  cedula: conductorToEdit?.cedula ?? 0,
  celular: conductorToEdit?.celular ?? 0,
  correo: conductorToEdit?.correo ?? "",
  licencia: conductorToEdit?.licencia ?? ""
  });

 /* const [form, setForm] = useState({
    id: 0,
    nombre: "",
    cedula: 0,
    celular: 0,
    correo: "",
    licencia: ""
  });
*/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = (): string | null => {
    if (!form.id || !form.licencia || !form.nombre || !form.cedula || !form.celular || !form.correo)
      return "Todos los campos son obligatorios";

    if (Number(form.id) < 0)
      return "El ID no puede ser negativo";

    if (!form.correo.includes("@"))
      return "El correo debe contener un @";

    if (Number(form.celular) > 9999999999 || Number(form.celular) < 1000000000)
      return "El celular debe tener exactamente 10 dígitos";

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    const conductor: Conductor = {
      id: Number(form.id),
      nombre: form.nombre,
      cedula: Number(form.cedula),
      celular:Number (form.celular),
      correo: form.correo,
      licencia: form.licencia, 
      activo: false 
    };
      try {

    if (conductorToEdit) {
      await repository.update(conductor);
      alert("Conductor actualizado correctamente");
    } else {
      await repository.save(conductor);
      alert("Conductor registrado correctamente");
    }

    navigate("/conductores");

  } catch (error: unknown) {
     if (error instanceof Error) {
     alert(error.message);
     }
   }
  };
  


 

  return (
    <div style={{ padding: "20px" }}>
      <h1>{conductorToEdit ? "Editar Conductor" : "Registrar Conductor"}</h1>

      <input type= "number" name="id" placeholder="ID" onChange={handleChange} disabled={!!conductorToEdit} />
      <br /><br />

      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <br /><br />

      <input name="cedula" placeholder="Cédula" value={form.cedula} onChange={handleChange} />
      <br /><br />

      <input name="celular" placeholder="Celular" value={form.celular} onChange={handleChange} />
      <br /><br />

      <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
      <br /><br />

      <input name="licencia" placeholder="Licencia" value={form.licencia} onChange={handleChange} />
      <br /><br />

      <button onClick={handleSubmit}>
        Registrar
      </button>

      <button onClick={() => navigate("/")} style={{ marginLeft: "10px" }}>
        ← Volver al Inicio
      </button>
    </div>
  );
}