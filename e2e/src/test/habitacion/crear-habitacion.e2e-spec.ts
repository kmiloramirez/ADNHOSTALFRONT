import { HabitacionPrueba } from './../../page/habitacion/habitacion.po';
import { FormularioHabitacionPrueba } from './../../page/habitacion/formulario-habitacion.po';
import { browser } from "protractor";
import { AppPage } from "../../app.po";
import { NavbarPage } from "../../page/navbar/navbar.po";

describe("Crear habitacion", () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let habitacion: HabitacionPrueba;
    let crearHabitacion: FormularioHabitacionPrueba;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        habitacion = new HabitacionPrueba();
        crearHabitacion = new FormularioHabitacionPrueba();
      });

      it("Deberia crear habitacion", () => {
        page.navigateTo();     
        browser.sleep(500);
        navBar.clickBotonHabitacion();
        habitacion.clickBotonCrearHabitacion();
        browser.sleep(500);
        crearHabitacion.clickNumeroInput();
        const valor: number = Date.now()
        crearHabitacion.setNumeroInput(valor)
        crearHabitacion.clickCamasInput();
        crearHabitacion.setCamasInput(1)
        crearHabitacion.clickPrecioInput();
        crearHabitacion.setPrecioInput(100)
        crearHabitacion.clickDescripcionInput();
        crearHabitacion.setDescripcionInput()
        browser.sleep(500);

        crearHabitacion.clickBotonCrearHabitacion();
        browser.sleep(500);

        const alerta = crearHabitacion.getTextoSwal();
        console.log(alerta)
        expect(alerta).toEqual(`La habitacion ${valor} fue creada con exito`);
        browser.sleep(300);
      });

});