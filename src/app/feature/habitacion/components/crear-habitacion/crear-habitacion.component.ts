import { AlertService } from './../../../../shared/services/alert/alert.service';
import { ComandoHabitacion } from './../../shared/model/comando-habitacion';
import { Router } from '@angular/router';
import { HabitacionService } from '@habitacion/shared/service/habitacion.service';
import { FormGroup } from '@angular/forms';
import { FormularioHabitacion } from '@habitacion/shared/formulario/formulario-habitacion';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-habitacion',
  templateUrl: './crear-habitacion.component.html',
  styleUrls: ['./crear-habitacion.component.css']
})
export class CrearHabitacionComponent implements OnInit {

  
  formularioHabitacion: FormularioHabitacion;
  formularioCrearHabitacion: FormGroup;

  constructor(protected habitacionServicio: HabitacionService,
    protected router: Router,protected alertaServicio: AlertService) { }

  ngOnInit(): void {
    this.formularioHabitacion = new FormularioHabitacion();
    this.formularioCrearHabitacion = this.formularioHabitacion.obtenerFormulario();
  }

  crearHabitacion() {
    if (this.formularioCrearHabitacion.valid) {
      const numeroHabitacion: string = this.formularioCrearHabitacion.get("numero").value;
      const numeroCamas: number = this.formularioCrearHabitacion.get("camas").value;
      const precio: number = this.formularioCrearHabitacion.get("precio").value;
      const descripcion: string = this.formularioCrearHabitacion.get("descripcion").value;
      const comandoHabitacion = new ComandoHabitacion(numeroHabitacion, numeroCamas, precio, descripcion,);
      this.habitacionServicio.crearHabitacion(comandoHabitacion).subscribe(
        () => {
          this.alertaServicio.alert(
            "Habitacion creada",
             `La habitacion ${numeroHabitacion} fue creada con exito`
          );
          this.router.navigate(["/habitacion/listar"]);
        }, (error) => {

          this.alertaServicio.alert(
            "Habitacion no creada",
             error.error.mensaje,
            "error"
          );
        }
      )
    }

  }

}
