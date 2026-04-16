import type { ConductorRepository } from "../../domain/repositories/ConductorRepository";
// Importa la interfaz del repositorio de conductores

export const GetConductores = async (
  // Define la función GetConductores como asíncrona
  repository: ConductorRepository
  // repository: instancia del repositorio que implementa ConductorRepository
) => {
  return await repository.getAll();
  // Llama al método getAll del repositorio y devuelve el resultado
};