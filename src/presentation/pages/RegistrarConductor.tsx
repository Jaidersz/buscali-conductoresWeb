import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConductorMockRepository } from "../../infrastructure/ConductorMockRepository";
// TEMPORAL: usando mock
import { RegisterConductor } from "../../application/useCases/RegisterConductor";
import { UpdateConductor } from "../../application/useCases/UpdateConductor";
import type { Conductor } from '../../domain/entities/Conductor';
import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// TEMPORAL: comentado axios para usar mock
//import type {ValidationError} from '../../domain/entities/Errors'

export default function RegistrarConductor() {
  const location = useLocation();
  const conductorToEdit = location.state as Conductor | undefined;

  const navigate = useNavigate();
  const repository = new ConductorMockRepository();
  // TEMPORAL: instancia del repositorio mock

  const [form, setForm] = useState({
    cedula: conductorToEdit?.cedula || '',
    nombre: conductorToEdit?.nombre || '',
    telefono: conductorToEdit?.telefono || '',
    correo_electronico: conductorToEdit?.correo_electronico || '',
    contrasena: conductorToEdit?.contrasena || '',
    estado: conductorToEdit?.estado || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // TEMPORAL: usando mock en lugar de axios
      if (conductorToEdit) {
        // Modo editar
        const updatedConductor: Conductor = {
          cedula: conductorToEdit.cedula,
          nombre: form.nombre || conductorToEdit.nombre,
          correo_electronico: form.correo_electronico || conductorToEdit.correo_electronico,
          telefono: form.telefono || conductorToEdit.telefono,
          estado: form.estado || conductorToEdit.estado,
          contrasena: form.contrasena || conductorToEdit.contrasena,
        };
        await UpdateConductor(repository, updatedConductor);
        alert('Conductor Actualizado correctamente');
        navigate('/conductores');
      } else {
        // Modo registrar
        const newConductor: Conductor = {
          cedula: form.cedula,
          nombre: form.nombre,
          correo_electronico: form.correo_electronico,
          telefono: form.telefono,
          contrasena: form.contrasena,
          estado: form.estado,
        };
        await RegisterConductor(repository, newConductor);
        alert('Conductor registrado correctamente');
        navigate('/conductores');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar la solicitud");
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
            className='btn-volver'
          >
            ← Volver
          </button>
          <div style={{ padding: '15px' }}>
            <h1>
              {/* // el edit no funciona pues el flujo actual para editar solo cambia el titulo del formulario de registro, no se conecta con la pi ni hace la peticion put de manera adecuada, por lo que actualmente es el mismo formulario de post para crear y para editar
              // REPITO: solo cambia el titulo, el formulario es el mismo y la peticion es la misma */}
              {conductorToEdit ? 'Editar Conductor' : 'Registro'}
            </h1>

            {!conductorToEdit && (
              <>
                
                <strong>Cédula</strong>
                
                <input
                  name='cedula'
                  placeholder='1234567890'
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
              placeholder='usuarioexample.@gmail.com'
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
          <button onClick={handleSubmit} className='btn-registrar-editar'>
            {conductorToEdit ? 'Actualizar' : 'Registrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
