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

  <div className="register-page">
  <div className="register-container">

    <div className="register-left">
      <img src="/Torre-de-Cali.jpg" alt="Driver" />
    </div>


    <div className="register-right">
      

      <button onClick={() => navigate("/")} style={{ marginLeft: "2px" }}>
        ← Volver al Inicio
      </button>
      <div style={{ padding: "15px" }}>
      <h1>{conductorToEdit ? "Editar Conductor" : "Registro Conductor"}</h1>
       
       <br /><strong>ID</strong><br />
      <input type= "number" name="id" placeholder="ID" onChange={handleChange} disabled={!!conductorToEdit} />
      
        <br /><strong>Nombre</strong><br />
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      

       <br /><strong>Cédula</strong><br />
      <input name="cedula" placeholder="Cédula" value={form.cedula} onChange={handleChange} />
      
       <br /><strong>Celular</strong><br />
      <input name="celular" placeholder="Celular" value={form.celular} onChange={handleChange} />
      
        <br /><strong>Correo</strong><br />
      <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
      
        <br /><strong>Licencia</strong><br />
      <input name="licencia" placeholder="Licencia" value={form.licencia} onChange={handleChange} />
      <br /><br />

      <button onClick={handleSubmit}>
        Registrar
      </button>

     </div>


    
    </div>
    </div>
    </div>
  );
}