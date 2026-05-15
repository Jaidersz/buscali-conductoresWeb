import axios from 'axios';
import type { Conductor } from '../domain/entities/Conductor';
import type { ConductorRepository } from '../domain/repositories/ConductorRepository';

/**
 * URL base del backend definida desde variables de entorno.
 *
 * Ejemplo:
 * VITE_API_URL=https://api.midominio.com
 */
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Cliente HTTP principal.
 *
 * withCredentials permite enviar automáticamente
 * las cookies httpOnly usadas para autenticación JWT.
 */
const api = axios.create({
  withCredentials: true,
});

type ApiSuccess<T> = {
  status?: string;
  data?: T;
  message?: string;
};

/**
 * Convierte una fila del backend
 * al modelo Conductor del frontend.
 */
function mapRow(raw: Record<string, unknown>): Conductor {
  return {
    cedula: String(raw.cedula ?? ''),
    nombre: String(raw.nombre ?? ''),
    correo_electronico: String(raw.correo_electronico ?? ''),
    telefono: String(raw.telefono ?? ''),
    estado: raw.estado != null ? String(raw.estado) : undefined,
  };
}

/**
 * Extrae y transforma la lista de conductores.
 */
function unwrapList(res: unknown): Conductor[] {
  const body = res as ApiSuccess<Record<string, unknown>[]>;
  const list = Array.isArray(body.data) ? body.data : [];

  return list.map(mapRow);
}

/**
 * Normaliza errores HTTP y de red.
 */
function apiErrorMessage(err: unknown): string {
  if (!axios.isAxiosError(err) || !err.response?.data) {
    return err instanceof Error ? err.message : 'Error de red';
  }

  const data = err.response.data as {
    errors?: string[];
    message?: string;
  };

  if (Array.isArray(data.errors) && data.errors.length) {
    return data.errors.join(' ');
  }

  if (typeof data.message === 'string') {
    return data.message;
  }

  return `Error ${err.response.status}`;
}

/**
 * Repositorio de conductores conectado al backend.
 */
export class ConductorApiRepository implements ConductorRepository {
  async getAll(): Promise<Conductor[]> {
    try {
      const { data } = await api.get<ApiSuccess<Record<string, unknown>[]>>(
        `${API_URL}/conductores`,
      );

      return unwrapList(data);
    } catch (e) {
      throw new Error(apiErrorMessage(e));
    }
  }

  async save(conductor: Conductor): Promise<void> {
    const telefono = conductor.telefono.replace(/\D/g, '');
    const cedula = conductor.cedula.replace(/\D/g, '');

    const estado = conductor.estado === 'Inactivo' ? 'Inactivo' : 'Activo';

    try {
      await api.post(`${API_URL}/conductores`, {
        cedula,
        nombre: conductor.nombre.trim(),
        correo_electronico: conductor.correo_electronico.trim(),
        telefono,
        contrasena: conductor.contrasena ?? '',
        aceptaTerminos: true,
        estado,
      });
    } catch (e) {
      throw new Error(apiErrorMessage(e));
    }
  }

  async delete(cedula: string): Promise<void> {
    try {
      await api.delete(`${API_URL}/conductores/${encodeURIComponent(cedula)}`);
    } catch (e) {
      throw new Error(apiErrorMessage(e));
    }
  }

  async update(conductor: Conductor): Promise<void> {
    const telefono = conductor.telefono.replace(/\D/g, '');

    const estado: 'Activo' | 'Inactivo' =
      conductor.estado === 'Inactivo' ? 'Inactivo' : 'Activo';

    const body: Record<string, string> = {};

    const nombre = conductor.nombre.trim();
    if (nombre) {
      body.nombre = nombre;
    }

    const correo = conductor.correo_electronico.trim();
    if (correo) {
      body.correo_electronico = correo;
    }

    if (telefono) {
      body.telefono = telefono;
    }

    body.estado = estado;

    try {
      await api.put(
        `${API_URL}/conductores/${encodeURIComponent(conductor.cedula)}`,
        body,
      );
    } catch (e) {
      throw new Error(apiErrorMessage(e));
    }
  }
}
