import { by, element } from "protractor";
export class HabitacionPrueba {

    private botonCrearHabitacion = element(by.id("crearHabitcion"));
    private botonListarHabitacion = element(by.id("listarHabitacion"));

    async clickBotonCrearHabitacion() {
        await this.botonCrearHabitacion.click();
    }

    async clickBotonListarHabitacion() {
        await this.botonListarHabitacion.click();
    }
}