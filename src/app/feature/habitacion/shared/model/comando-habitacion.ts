
export class ComandoHabitacion {
    numero: string;
    camas: number;
    precio: number;
    descripcion: string;
    constructor(numero: string, camas: number, precio: number, descripcion: string) {
        this.numero = numero;
        this.camas = camas;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}
