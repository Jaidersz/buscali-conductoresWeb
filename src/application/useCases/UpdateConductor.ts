import type { Conductor } from "../../domain/entities/Conductor";
import type { ConductorRepository } from "../../domain/repositories/ConductorRepository";

export const UpdateConductor = async (
  repository: ConductorRepository,
  conductor: Conductor
) => {
  await repository.update(conductor);
};