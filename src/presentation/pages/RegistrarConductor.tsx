import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { ConductorMockRepository } from "../../infrastructure/ConductorMockRepository";
import type { Conductor } from '../../domain/entities/Conductor';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function RegistrarConductor() {
  const location = useLocation();
  const conductorToEdit = location.state as Conductor | undefined;

  const navigate = useNavigate();
  //const repository = new ConductorMockRepository();

  // const [form, setForm] = useState({
  //   cedula: conductorToEdit!.cedula,
  //   nombre: conductorToEdit!.nombre,
  //   telefono: conductorToEdit!.telefono,
  //   correo_electronico: conductorToEdit!.correo_electronico,
  //   contrasena: conductorToEdit?.contrasena ?? '',
  //   estado: conductorToEdit?.estado ?? '',
  // });

  const [form, setForm] = useState({
    cedula: '',
    nombre: '',
    telefono: '',
    correo_electronico: '',
    contrasena: '',
    estado: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const body = {
      cedula: form.cedula,
      nombre: form.nombre,
      correo_electronico: form.correo_electronico,
      telefono: form.telefono,
      contrasena: form.contrasena,
      estado: form.estado,
    };
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const register = await axios.post(`${API_URL}/conductores`, body);
      if (register.data) {
        alert('Conductor registrado correctamente');
        navigate('/conductores');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Aquí recibes lo que tu backend mandó
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error en la petición";
    
        if (status === 400) {
          alert(`Error de validación: ${message}`);
        } else if (status === 409) {
          alert(`Datos duplicados: ${message}`);
        } else {
          alert(message);
        }
      } else {
        alert("Error inesperado");
      }
    }
  };

  return (
    <div className='register-page'>
      <div className='register-container'>
        <div className='register-left'>
          <img src='/Torre-de-Cali.jpg' alt='Driver' />
        </div>

        <div className='register-right'>
          <button onClick={() => navigate('/')} style={{ marginLeft: '2px' }}>
            ← Volver al Inicio
          </button>
          <div style={{ padding: '15px' }}>
            <h1>
              {conductorToEdit ? 'Editar Conductor' : 'Registro Conductor'}
            </h1>

            <strong>Cédula</strong>
            <br />
            <input
              name='cedula'
              placeholder='Cédula'
              value={form.cedula}
              onChange={handleChange}
            />

            <br />

            <br />
            <strong>Nombre</strong>
            <br />
            <input
              name='nombre'
              placeholder='Nombre'
              value={form.nombre}
              onChange={handleChange}
            />

            <br />

            <br />
            <strong>Correo Electronico</strong>
            <br />
            <input
              name='correo_electronico'
              placeholder='Correo Electronico'
              value={form.correo_electronico}
              onChange={handleChange}
            />

            <strong>Teléfono</strong>
            <br />
            <input
              name='telefono'
              placeholder='Telefono'
              value={form.telefono}
              onChange={handleChange}
            />

            <br />
            <strong>Contraseña</strong>
            <br />
            <input
              name='contrasena'
              placeholder='Contraseña'
              value={form.contrasena}
              onChange={handleChange}
            />

            <br />
            <strong>Estado</strong>
            <br />
            <input
              name='estado'
              placeholder='Estado'
              value={form.estado}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSubmit}>Registrar</button>
        </div>
      </div>
    </div>
  );
}
