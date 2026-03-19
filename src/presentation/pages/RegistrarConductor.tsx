import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { ConductorMockRepository } from "../../infrastructure/ConductorMockRepository";
import type { Conductor } from "../../domain/entities/Conductor";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function RegistrarConductor() {

  const location = useLocation();
  const conductorToEdit = location.state as Conductor | undefined;

  const navigate = useNavigate();
  //const repository = new ConductorMockRepository();

  const [form, setForm] = useState({
  //id: conductorToEdit?.id ?? 0,
  nombre: conductorToEdit?.nombre ?? "",
  cedula: conductorToEdit?.cedula ?? 0,
  celular: conductorToEdit?.celular ?? 0,
  correo: conductorToEdit?.correo ?? "",
  //licencia: conductorToEdit?.licencia ?? ""
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

  /*const validate = (): string | null => {
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

*/
  const handleSubmit = async () => {
   

    const body = {
      
      nombre: form.nombre,
      cedula: form.cedula,
      celular:form.celular,
      correo: form.correo,
      activo: "Activo"
    };
      try {

   const register = await axios.post("http://localhost:8080/api/conductores", body);
   if (register.status === 201) {
     alert("Conductor registrado correctamente");
     navigate("/conductores");
   }

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
       

        <br /><strong>Nombre</strong><br />
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />

       <br /><strong>Cédula</strong><br />
      <input name="cedula" placeholder="Cédula" value={form.cedula} onChange={handleChange} />
      
       <br /><strong>Teléfono</strong><br />
      <input name="celular" placeholder="Celular" value={form.celular} onChange={handleChange} />
      
        <br /><strong>Correo</strong><br />
      <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
      

      <button onClick={handleSubmit}>
        Registrar
      </button>

     </div>


    
    </div>
    </div>
    </div>
  );
}