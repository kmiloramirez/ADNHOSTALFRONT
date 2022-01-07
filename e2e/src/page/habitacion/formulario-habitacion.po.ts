import { by, element } from "protractor";
export class FormularioHabitacionPrueba {

    private numeroInput = element(by.id("numero"));
    private camasInput = element(by.id("camas"));
    private precioInput = element(by.id("precio"));
    private descripcionInput = element(by.id("descripcion"));
    private botonCrearHabitacion = element(by.id("crear"));
    private botonCrearHabitacionCancelar = element(by.id("regresar"));
    private swal = element(by.className('swal2-html-container'));

    async clickNumeroInput() {
        await this.numeroInput.click();
    }

    async setNumeroInput(numero: number) {
        await this.numeroInput.sendKeys(numero);
    }

    async clickCamasInput() {
        await this.camasInput.click();
    }

    async setCamasInput(camas: number) {
        await this.camasInput.sendKeys(camas);
    }

    async clickPrecioInput() {
        await this.precioInput.click();
    }

    async setPrecioInput(precio: number) {
        await this.precioInput.sendKeys(precio);
    }

    async clickDescripcionInput() {
        await this.descripcionInput.click();
    }

    async setDescripcionInput() {
        await this.descripcionInput.sendKeys("creado por protrator");
    }

    async clickBotonCrearHabitacion() {
        await this.botonCrearHabitacion.click();
    }

    async clickBotonCrearHabitacionCancelar() {
        await this.botonCrearHabitacionCancelar.click();
    }

    async getTextoSwal(): Promise<string> {
        return await this.swal.getText();
    }


}