
export class ComandoReserva {
    numeroReserva: number;
    nombre: string;
    fechaEntrada: Date;
    numeroHabitacion: string;
    fechaSalida: Date;
    estadoReserva: string;
    constructor(numeroReserva?: number,nombre?: string, fechaEntrada?: Date, numeroHabitacion?: string, fechaSalida?: Date,estadoReserva?: string) {
        this.numeroReserva = numeroReserva;
        this.nombre = nombre;
        this.fechaEntrada = fechaEntrada;
        this.numeroHabitacion = numeroHabitacion;
        this.fechaSalida = fechaSalida;
        this.estadoReserva = estadoReserva

    }

 

}

