import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConductorApiRepository } from "../../infrastructure/ConductorApiRepository";
import { RegisterConductor } from "../../application/useCases/RegisterConductor";
import { UpdateConductor } from "../../application/useCases/UpdateConductor";
import type { Conductor } from '../../domain/entities/Conductor';
import { useLocation } from 'react-router-dom';

export default function RegistrarConductor() {
  const location = useLocation();
  const conductorToEdit = location.state as Conductor | undefined;

  const navigate = useNavigate();
  const repository = useMemo(() => new ConductorApiRepository(), []);

  const [form, setForm] = useState({
    cedula: conductorToEdit?.cedula || '',
    nombre: conductorToEdit?.nombre || '',
    telefono: conductorToEdit?.telefono || '',
    correo_electronico: conductorToEdit?.correo_electronico || '',
    contrasena: conductorToEdit?.contrasena || '',
    estado:
      conductorToEdit?.estado === 'Inactivo' ? 'Inactivo' : 'Activo',
  });

  useEffect(() => {
    if (conductorToEdit) {
      setForm({
        cedula: conductorToEdit.cedula,
        nombre: conductorToEdit.nombre || '',
        telefono: conductorToEdit.telefono || '',
        correo_electronico: conductorToEdit.correo_electronico || '',
        contrasena: '',
        estado:
          conductorToEdit.estado === 'Inactivo' ? 'Inactivo' : 'Activo',
      });
    } else {
      setForm({
        cedula: '',
        nombre: '',
        telefono: '',
        correo_electronico: '',
        contrasena: '',
        estado: 'Activo',
      });
    }
  }, [conductorToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (conductorToEdit) {
        const updatedConductor: Conductor = {
          cedula: conductorToEdit.cedula,
          nombre: form.nombre.trim() || conductorToEdit.nombre,
          correo_electronico:
            form.correo_electronico.trim() || conductorToEdit.correo_electronico,
          telefono:
            form.telefono.replace(/\D/g, '') ||
            conductorToEdit.telefono.replace(/\D/g, ''),
          estado: form.estado === 'Inactivo' ? 'Inactivo' : 'Activo',
        };
        await UpdateConductor(repository, updatedConductor);
        alert('Conductor Actualizado correctamente');
        navigate('/conductores');
      } else {
        // Modo registrar
        const newConductor: Conductor = {
          cedula: form.cedula.replace(/\D/g, ''),
          nombre: form.nombre.trim(),
          correo_electronico: form.correo_electronico.trim(),
          telefono: form.telefono.replace(/\D/g, ''),
          contrasena: form.contrasena,
          estado: form.estado === 'Inactivo' ? 'Inactivo' : 'Activo',
        };
        await RegisterConductor(repository, newConductor);
        alert('Conductor registrado correctamente');
        navigate('/conductores');
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Error al procesar la solicitud");
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
              {conductorToEdit ? 'Editar Conductor' : 'Registro'}
            </h1>

            {conductorToEdit && (
              <p style={{ marginBottom: 12, fontSize: 14 }}>
                <strong>Cédula:</strong> {conductorToEdit.cedula}
              </p>
            )}

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
              placeholder='3105106574'
              value={form.telefono}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  telefono: e.target.value.replace(/\D/g, ''),
                }))
              }
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
            <select
              name='estado'
              value={form.estado}
              onChange={(e) =>
                setForm((f) => ({ ...f, estado: e.target.value }))
              }
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            >
              <option value='Activo'>Activo</option>
              <option value='Inactivo'>Inactivo</option>
            </select>
          </div>
          <button onClick={handleSubmit} className='btn-registrar-editar'>
            {conductorToEdit ? 'Actualizar' : 'Registrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
