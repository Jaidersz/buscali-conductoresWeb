export interface ValidationError {
  // Define la interfaz ValidationError para errores de validación
  field: string;
  // field: nombre del campo que tiene el error
  message: string;
  // message: mensaje descriptivo del error
}
