import { AlertService } from './../../../../shared/services/alert/alert.service';
import { CobroReserva } from './../../shared/modelo/cobro-reserva';
import { ComandoReserva } from './../../shared/modelo/comando-reserva';
import { Router } from '@angular/router';
import { ReservaService } from './../../shared/service/reserva.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Reserva } from '@reserva/shared/modelo/reserva';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.css']
})
export class ListarReservaComponent implements OnInit {

  public listaReservas: Observable<Reserva[]>;

  constructor(protected reservaService: ReservaService, private router: Router, private alertaServicio: AlertService) { }

  ngOnInit(): void {
    this.listaReservas = this.consultarReservas();
  }

  eliminar(numeroReserva: number) {
    this.reservaService.eliminar(numeroReserva).subscribe(
      () => {
        this.alertaServicio.alert(
          "Reserva eliminada",
          `La reserva ${numeroReserva} fue eliminada con exito`
        );
        this.ngOnInit();
      }, (error) => {
        this.alertaServicio.alert(
          "No se pudo eliminar la reserva",
           error.error.mensaje,
          "error"
        );
      }
    );
  }

  editarReserva(numeroReserva: string) {
    console.log(numeroReserva)
    this.router.navigate([`/reserva/editar/${numeroReserva}`]);
  }

  activaReserva(numeroReserva: number, nombre: string) {
    const comandoReserva = this.crearComandoReserva(numeroReserva, nombre, "activa");
    this.reservaService.editar(comandoReserva).subscribe(() => {
      this.alertaServicio.alert(
        "Reserva activa",
        `La reserva ${numeroReserva} fue activada con exito`
      );
      this.ngOnInit();
    }, (error) => {
      this.alertaServicio.alert(
        "No se pudo activar la reserva",
         error.error.mensaje,
        "error"
      );
    });
  }

  terminarReserva(numeroReserva: number) {
    this.reservaService.cobrarReserva(numeroReserva).subscribe((cobroeserva: CobroReserva) => {
      this.alertaServicio.alertDolares(cobroeserva);
      this.ngOnInit();
    }, (error) => {
      this.alertaServicio.alert(
        "No se pudo terminar la reserva",
         error.error.mensaje,
        "error"
      );
    });
  }

  conocerValorDolares(numeroReserva: number){
    this.reservaService.consultarDolares(numeroReserva).subscribe((cobroeserva: CobroReserva)=>{
      this.alertaServicio.alertDolares(cobroeserva);
    },(error)=>{
      this.alertaServicio.alert(
        "No se pudo consultar cobro en dolares",
         error.error.mensaje,
        "error"
      );
    })
  }

  private consultarReservas() {
    return this.reservaService.consultarReservas();

  }

  private crearComandoReserva(numeroReserva: number, nombre: string, estadoReserva: string){
    return new ComandoReserva(numeroReserva, nombre, null, null, null, estadoReserva);
  }

}


