import axios from "axios";
import type { Conductor } from "../domain/entities/Conductor";
import type { ConductorRepository } from "../domain/repositories/ConductorRepository";

type ApiSuccess<T> = {
  status?: string;
  data?: T;
  message?: string;
};

function mapRow(raw: Record<string, unknown>): Conductor {
  return {
    cedula: String(raw.cedula ?? ""),
    nombre: String(raw.nombre ?? ""),
    correo_electronico: String(raw.correo_electronico ?? ""),
    telefono: String(raw.telefono ?? ""),
    estado: raw.estado != null ? String(raw.estado) : undefined,
  };
}

function unwrapList(res: unknown): Conductor[] {
  const body = res as ApiSuccess<Record<string, unknown>[]>;
  const list = Array.isArray(body.data) ? body.data : [];
  return list.map((row) => mapRow(row));
}

function apiErrorMessage(err: unknown): string {
  if (!axios.isAxiosError(err) || !err.response?.data) {
    return err instanceof Error ? err.message : "Error de red";
  }
  const d = err.response.data as { errors?: string[]; message?: string };
  if (Array.isArray(d.errors) && d.errors.length) return d.errors.join(" ");
  if (typeof d.message === "string") return d.message;
  return `Error ${err.response.status}`;
}

/** Persistencia real contra buscali-backend (`/api/v1/conductores`). Requiere sesión (cookie tras login). */
export class ConductorApiRepository implements ConductorRepository {
  async getAll(): Promise<Conductor[]> {
    try {
      const { data } = await axios.get<ApiSuccess<Record<string, unknown>[]>>(
        "/api/v1/conductores"
      );
      return unwrapList(data);
    } catch (e) {
      throw new Error(apiErrorMessage(e));
    }
  }

  async save(conductor: Conductor): Promise<void> {
    const telefono = conductor.telefono.replace(/\D/g, "");
    const cedula = conductor.cedula.replace(/\D/g, "");
    const estado =
      conductor.estado === "Inactivo" ? "Inactivo" : "Activo";
    try {
      await axios.post("/api/v1/conductores", {
        cedula,
        nombre: conductor.nombre.trim(),
        correo_electronico: conductor.correo_electronico.trim(),
        telefono,
        contrasena: conductor.contrasena ?? "",
        aceptaTerminos: true,
        estado,
      });
    } catch (e) {
      throw new Error(apiErrorMessage(e));
    }
  }

  async delete(cedula: string): Promise<void> {
    try {
      await axios.delete(
        `/api/v1/conductores/${encodeURIComponent(cedula)}`
      );
    } catch (e) {
      throw new Error(apiErrorMessage(e));
    }
  }

  async update(conductor: Conductor): Promise<void> {
    const telefono = conductor.telefono.replace(/\D/g, "");
    const estado: "Activo" | "Inactivo" =
      conductor.estado === "Inactivo" ? "Inactivo" : "Activo";
    const body: Record<string, string> = {};
    const nombre = conductor.nombre.trim();
    if (nombre) body.nombre = nombre;
    const mail = conductor.correo_electronico.trim();
    if (mail) body.correo_electronico = mail;
    if (telefono) body.telefono = telefono;
    body.estado = estado;
    try {
      await axios.put(
        `/api/v1/conductores/${encodeURIComponent(conductor.cedula)}`,
        body
      );
    } catch (e) {
      throw new Error(apiErrorMessage(e));
    }
  }
}
