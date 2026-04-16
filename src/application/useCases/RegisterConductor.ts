import type { Conductor } from "../../domain/entities/Conductor";
// Importa el tipo Conductor desde la entidad
import type { ConductorRepository } from "../../domain/repositories/ConductorRepository";
// Importa la interfaz del repositorio de conductores

export const RegisterConductor = async (
  // Define la función RegisterConductor como asíncrona
  repository: ConductorRepository,
  // repository: instancia del repositorio que implementa ConductorRepository
  conductor: Conductor
  // conductor: objeto Conductor con los datos a registrar
) => {
  await repository.save(conductor);
  // Llama al método save del repositorio para guardar el conductor
};