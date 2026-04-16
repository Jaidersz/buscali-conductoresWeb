// DeleteConductor.ts
// Archivo que contiene el caso de uso para eliminar un conductor
//export const DeleteConductor = (id: string) => {
 // console.log(`Conductor con id ${id} eliminado`);
//};
// Código comentado: implementación anterior simple sin repositorio

import type { ConductorRepository } from "../../domain/repositories/ConductorRepository";
// Importa la interfaz del repositorio de conductores

export const DeleteConductor = async (
  // Define la función DeleteConductor como asíncrona
  repository: ConductorRepository,
  // repository: instancia del repositorio que implementa ConductorRepository
  id: number
  // id: identificador numérico del conductor a eliminar
) => {
  await repository.delete(id);
  // Llama al método delete del repositorio y espera su resolución
};
