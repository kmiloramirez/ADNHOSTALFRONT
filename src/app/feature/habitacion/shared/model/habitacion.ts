
export class Habitacion {
    id: number;
    numero: string;
    camas: number;
    precio: number;
    descripcion: string;
    constructor(id: number, numero: string, camas: number, precio: number, descripcion: string) {
        this.id = id;
        this.numero = numero;
        this.camas = camas;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}
