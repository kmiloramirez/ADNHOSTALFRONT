import { FormControl, FormGroup, Validators } from '@angular/forms';


export class FormularioHabitacion {

    numero = new FormControl(null, Validators.required);
    camas = new FormControl(null, Validators.required);
    precio = new FormControl(null, Validators.required);
    descripcion = new FormControl(null, Validators.required);

    obtenerFormulario() {
        return new FormGroup({ numero: this.numero, camas: this.camas, precio: this.precio, descripcion: this.descripcion });
    }
}