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
  nombre: string;
  cedula: string;
  celular: string;
  correo: string;
  activo: boolean;

}