

export class Reserva {
    numeroReserva: number;
    nombre: string;
    fechaEntrada: string;
    numeroHabitacion: string;
    fechaSalida: string;
    fechaRegistro: string;
    costoTotal: number;
    estadoReserva: string;

    constructor(numeroReserva: number, nombre: string, fechaEntrada: string, numeroHabitacion: string,
        fechaSalida: string, fechaRegistro: string, costoTotal: number, estadoReserva: string) {
        this.numeroReserva = numeroReserva;
        this.nombre = nombre;
        this.fechaEntrada = fechaEntrada;
        this.numeroHabitacion = numeroHabitacion;
        this.fechaSalida = fechaSalida;
        this.fechaRegistro = fechaRegistro;
        this.costoTotal = costoTotal;
        this.estadoReserva = estadoReserva;
    }

}
