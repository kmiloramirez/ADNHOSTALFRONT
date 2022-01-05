import { FormControl, FormGroup, Validators } from '@angular/forms';


export class FormularioReserva {
    nombre = new FormControl(null, Validators.required);
    numeroHabitacion = new FormControl(null, Validators.required);
    fechaEntrada = new FormControl(null, Validators.required);
    fechaSalida = new FormControl(null, Validators.required);

    obtenerFormulario() {
        return new FormGroup({ nombre: this.nombre, numeroHabitacion: this.numeroHabitacion, 
            fechaEntrada: this.fechaEntrada, fechaSalida: this.fechaSalida });
    }

    obtenerFormularioSoloNombre(nombre: string) {
        this.nombre = new FormControl(nombre, Validators.required)
        return new FormGroup({ nombre: this.nombre});
    }
}