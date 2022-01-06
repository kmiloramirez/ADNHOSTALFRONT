import { AlertService } from './../../../../shared/services/alert/alert.service';
import { ComandoReserva } from './../../shared/modelo/comando-reserva';
import { ReservaService } from './../../shared/service/reserva.service';
import { FormGroup } from '@angular/forms';
import { FormularioReserva } from '../../shared/fromulario/formulario-reserva';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '@reserva/shared/modelo/reserva';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css']
})
export class EditarReservaComponent implements OnInit {

  reserva: Reserva;
  formularioReserva: FormularioReserva;
  formularioEditarReserva: FormGroup;
  numeroReserva: number;

  constructor(private activatedRoute: ActivatedRoute,
    public reservaServicio: ReservaService,private router: Router, private alertaServicio: AlertService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => this.numeroReserva = params['numeroReserva']);
    console.log(this.numeroReserva)
    this.obtenerReservaYCrearFormulario();
  }

  editarReserva() {
    if (this.formularioEditarReserva.valid) {
      const numeroReserva: number = this.reserva.numeroReserva;
      const nombre: string = this.formularioEditarReserva.get("nombre").value;
      const estadoReserva: string = this.reserva.estadoReserva;
      const comandoReserva = new ComandoReserva(numeroReserva, nombre, null, null, null, estadoReserva);
      this.reservaServicio.editar(comandoReserva).subscribe(()=>{
        this.alertaServicio.alert(
          "Se cambiar el nombre de la reserva",
          `Se modifico exitosamente el nombre en la reserva: ${numeroReserva}`,
        );
        this.router.navigate(["/reserva/listar"]);
      },(error)=>{
        this.alertaServicio.alert(
          "No se pudo cambiar el nombre de la reserva",
           error.error.mensaje,
          "error"
        );
      });

    }

  }

  private obtenerReservaYCrearFormulario() {
    this.reservaServicio.consultar(this.numeroReserva).subscribe((reserva: Reserva) => {
      this.reserva = reserva;
      this.formularioReserva = new FormularioReserva;
      this.formularioEditarReserva = this.formularioReserva.obtenerFormularioSoloNombre(reserva.nombre);

    }, (error) => {
      this.alertaServicio.alert(
        "No se pudo cargar la reserva",
         error.error.mensaje,
        "error"
      );

    })
  }

}
