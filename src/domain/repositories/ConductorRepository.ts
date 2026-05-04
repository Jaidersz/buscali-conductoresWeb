import type { Conductor } from "../entities/Conductor";
// Importa el tipo Conductor desde la entidad

export interface ConductorRepository {
  // Define la interfaz del repositorio para operaciones con conductores
  getAll(): Promise<Conductor[]>;
  // getAll(): método que devuelve una promesa con un array de todos los conductores
  save(conductor: Conductor): Promise<void>;
  // save(): método que guarda un nuevo conductor, devuelve promesa vacía
  delete(cedula: string): Promise<void>;
  // delete(): método que elimina un conductor por cedula, devuelve promesa vacía
  update(conductor: Conductor): Promise<void>;
  // update(): método que actualiza un conductor existente, devuelve promesa vacía
}