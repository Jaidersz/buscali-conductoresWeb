import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { ConductorMockRepository } from "../../infrastructure/ConductorMockRepository";
import type { Conductor } from '../../domain/entities/Conductor';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
//import type {ValidationError} from '../../domain/entities/Errors'

export default function RegistrarConductor() {
  const location = useLocation();
  const conductorToEdit = location.state as Conductor | undefined;
  const selectCedula = location.state as string | undefined;

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
    const body: Partial<Conductor> = {};

    if (conductorToEdit) {
      // Construcción del body para editar: todo es opcional
      if (form.nombre) {
        body.nombre = form.nombre;
      }
      if (form.correo_electronico) {
        body.correo_electronico = form.correo_electronico;
      }
      if (form.telefono) {
        body.telefono = form.telefono;
      }
      if (form.estado) {
        body.estado = form.estado;
      }
    } else {
      // Construcción del body: incluye opcionales solo si tienen valor
        body.cedula= form.cedula;
        body.nombre= form.nombre;
        body.correo_electronico= form.correo_electronico;
        body.telefono= form.telefono;
      

        if (form.contrasena) body.contrasena = form.contrasena;
        if (form.estado) body.estado = form.estado;
    }
console.log(body)
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      console.log(conductorToEdit!.cedula);
      if (conductorToEdit) {
        const update = await axios.put(
          `${API_URL}/conductores/${selectCedula}`,
          body,
        );
        if (update.data) {
          alert('Conductor Actualizado correctamente');
          navigate('/conductores');
        }
      } else {
        const register = await axios.post(`${API_URL}/conductores`, body);

        if (register.data) {
          alert('Conductor registrado correctamente');
          navigate('/conductores');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Aquí recibes lo que tu backend mandó
        const status = error.response?.status;
        const message = error.response?.data.error || 'Error en la petición';

        // const message = error.response?.data.error
        if (status === 400) {
          //estas alert's son las que le muestran al usuario los errores, cambiar el alert por un popup u otra cosa mas bonita
          alert(`Error de validación:\n${message}`);
        } else if (status === 409) {
          alert(`Datos duplicados:\n${message}`);
        } else {
          alert(message);
        }
      } else {
        alert('Error inesperado');
        console.log(body)
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
          <button
            onClick={() => navigate('/conductores')}
            style={{ marginLeft: '2px' }}
          >
            ← Volver
          </button>
          <div style={{ padding: '15px' }}>
            <h1>
              {/* // el edit no funciona pues el flujo actual para editar solo cambia el titulo de lformunlario de registro, no se conecta con la pi ni hace la peticion put de manera adecuada, por lo que actualmente es el mismo formulario de post para crear y para editar
              // REPITO: solo cambia el titulo, el formulario es el mismo y la peticion es la misma */}
              {conductorToEdit ? 'Editar Conductor' : 'Registro Conductor'}
            </h1>

            {!conductorToEdit && (
              <>
                
                <strong>Cédula</strong>
                
                <input
                  name='cedula'
                  placeholder='99999999'
                  value={form.cedula}
                  onChange={handleChange}
                />
              </>
            )}

            

            
            <strong>Nombre</strong>
            
            <input
              name='nombre'
              placeholder='Sebastian Manrique'
              value={form.nombre}
              onChange={handleChange}
            />

            

            
            <strong>Correo Electronico</strong>
            
            <input
              name='correo_electronico'
              placeholder='xjuanx69geymer@yaju.com'
              value={form.correo_electronico}
              onChange={handleChange}
            />

            <strong>Teléfono</strong>
            
            <input
              name='telefono'
              placeholder='+573105106574 / 3105106574'
              value={form.telefono}
              onChange={handleChange}
            />

            {!conductorToEdit && (
              <>
                
                <strong>Contraseña</strong>
                
                <input
                  name='contrasena'
                  placeholder='Abc@0123'
                  value={form.contrasena}
                  onChange={handleChange}
                />
              </>
            )}

            <strong>Estado</strong>
            <input
              name='estado'
              placeholder='Activo / Inactivo'
              value={form.estado}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSubmit}>
            {conductorToEdit ? 'Actualizar' : 'Registrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
