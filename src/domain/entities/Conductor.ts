//export class Conductor {
 // constructor(
   // public id: number,
    //public nombre: string,
    //public cedula: string,
    //public celular: string,
    //public correo: string,
    //public activo: boolean = false,
  //) {}
//}
// Código comentado: definición anterior de la clase Conductor con constructor

export interface Conductor {
  // Define la interfaz Conductor que representa la entidad de un conductor
  cedula: string;
  // cedula: campo obligatorio de tipo string para la cédula del conductor
  nombre: string;
  // nombre: campo obligatorio de tipo string para el nombre del conductor
  correo_electronico: string;
  // correo_electronico: campo obligatorio de tipo string para el correo electrónico
  telefono: string;
  // telefono: campo obligatorio de tipo string para el número de teléfono
  contrasena?: string;
  // contrasena?: campo opcional de tipo string para la contraseña
  estado?: string;
  // estado?: campo opcional de tipo string para el estado del conductor
}