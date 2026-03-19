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


export interface Conductor {
  cedula: string;
  nombre: string;
  correo_electronico: string;
  telefono: string;
  contrasena: string;
  estado: string;

}