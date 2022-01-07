import { ComandoRespuesta } from './../../../../shared/modelo/comando-respuesta';
import { AlertService } from './../../../../shared/services/alert/alert.service';
import { Router } from '@angular/router';
import { ComandoReserva } from './../../shared/modelo/comando-reserva';
import { FormularioReserva } from '../../shared/fromulario/formulario-reserva';
import { ReservaService } from './../../shared/service/reserva.service';
import { Observable } from 'rxjs';
import { HabitacionService } from './../../../habitacion/shared/service/habitacion.service';
import { Component, OnInit } from '@angular/core';
import { Habitacion } from 'src/app/feature/habitacion/shared/model/habitacion';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {


  listaHabitaciones: Observable<Habitacion[]>;
  formularioReserva: FormularioReserva;
  formularioCrearReserva: FormGroup;

  constructor(protected habitacionServicio: HabitacionService,
    protected reservaServicio: ReservaService,protected router: Router, protected alertaServicio: AlertService) { }

  ngOnInit(): void {
    this.listaHabitaciones = this.consultarHabitaciones();
    this.formularioReserva = new FormularioReserva();
    this.formularioCrearReserva = this.formularioReserva.obtenerFormulario();
  }

  crearReserva() {
    if (this.formularioCrearReserva.valid) {
      const nombre: string = this.formularioCrearReserva.get("nombre").value;
      const fechaEntrada: Date = this.formularioCrearReserva.get("fechaEntrada").value;
      const numeroHabitacion: string = this.formularioCrearReserva.get("numeroHabitacion").value;
      const fechaSalida: Date = this.formularioCrearReserva.get("fechaSalida").value;
      const comandoReserva = new ComandoReserva(null, nombre, fechaEntrada, numeroHabitacion, fechaSalida,null);      
      this.reservaServicio.crearReserva(comandoReserva).subscribe(
        (comandoRespuesta: ComandoRespuesta) => {
          this.alertaServicio.alert(
            "Reserva creada",
             `La reserva ${comandoRespuesta.valor} fue creada con exito`,
            "success"
          );
          this.router.navigate(["/reserva/listar"]);
        }, (error) => {
          this.alertaServicio.alert(
            "Reserva no creada",
             error.error.mensaje,
            "error"
          );
        }
      )
    }

  }

  private consultarHabitaciones() {
    return this.habitacionServicio.consultar();
  }


}
