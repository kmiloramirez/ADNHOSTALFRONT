import { by, element } from 'protractor';

export class NavbarPage {

    private botonReserva = element(by.id("reserva"));
    private botonHabitacion = element(by.id("habitacion"));

    async clickBotonHabitacion() {
        await this.botonHabitacion.click();
    }

    async clickBotonReserva() {
        await this.botonReserva.click();
    }
}
