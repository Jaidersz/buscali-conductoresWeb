import type { Conductor } from "../domain/entities/Conductor";
import type { ConductorRepository } from "../domain/repositories/ConductorRepository";

// REPO MOCK TEMPORAL - REMOVER CUANDO BACKEND ESTÉ DISPONIBLE
export class ConductorMockRepository implements ConductorRepository {
  private conductores: Conductor[] = [
    {
      cedula: "1234567890",
      nombre: "Juan Pérez",
      correo_electronico: "juan.perez@mail.com",
      telefono: "3001234567",
      estado: "Activo",
    },
    {
      cedula: "0987654321",
      nombre: "María García",
      correo_electronico: "maria.garcia@mail.com",
      telefono: "3009876543",
      estado: "Activo",
    },
    {
      cedula: "1122334455",
      nombre: "Carlos López",
      correo_electronico: "carlos.lopez@mail.com",
      telefono: "3005566778",
      estado: "Inactivo",
    },
    {
      cedula: "5566778899",
      nombre: "Ana Martínez",
      correo_electronico: "ana.martinez@mail.com",
      telefono: "3007788990",
      estado: "Activo",
    },
    {
      cedula: "2233445566",
      nombre: "Pedro Rodríguez",
      correo_electronico: "pedro.rodriguez@mail.com",
      telefono: "3003344556",
      estado: "Activo",
    },
  ];

  async getAll(): Promise<Conductor[]> {
    // Simula una petición con delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.conductores);
      }, 500);
    });
  }

  async save(conductor: Conductor): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.conductores.push(conductor);
        resolve();
      }, 400);
    });
  }

  async delete(cedula: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.conductores.findIndex((c) => c.cedula === cedula);
        if (index !== -1) {
          this.conductores.splice(index, 1);
          resolve();
        } else {
          reject(new Error("Conductor no encontrado"));
        }
      }, 400);
    });
  }

  async update(conductor: Conductor): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.conductores.findIndex((c) => c.cedula === conductor.cedula);
        if (index !== -1) {
          this.conductores[index] = conductor;
          resolve();
        } else {
          reject(new Error("Conductor no encontrado"));
        }
      }, 400);
    });
  }
}
