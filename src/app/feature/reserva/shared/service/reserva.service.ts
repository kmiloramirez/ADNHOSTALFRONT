import { CobroReserva } from './../modelo/cobro-reserva';
import { ComandoReserva } from './../modelo/comando-reserva';
import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Reserva } from '../modelo/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(protected http: HttpService) { }

  public consultarReservas() {
    return this.http.doGet<Reserva[]>(`${environment.endpoint}/reserva/lista-reservas`, this.http.optsName('Obtener reservas'));
  }

  public consultar(numeroReserva: number) {
    return this.http.doGet<Reserva>(`${environment.endpoint}/reserva?numeroReserva=${numeroReserva}`, this.http.optsName('Obtener reservas'));
  }

  public eliminar(numeroReserva: number) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/reserva?numeroReserva=${numeroReserva}`, this.http.optsName('Elimina Reserva'));
  }

  public crearReserva(comandoReseva:ComandoReserva){
    return this.http.doPost<ComandoReserva,number>(`${environment.endpoint}/reserva`,comandoReseva,this.http.optsName('Crea Reserva'));
  }

  public editar(comandoReseva:ComandoReserva){
    return this.http.doPost<ComandoReserva,boolean>(`${environment.endpoint}/reserva/modificar`,comandoReseva,this.http.optsName('Modifica Reserva'));
  }

  public consultarDolares(numeroReserva: number) {
    return this.http.doGet<CobroReserva>(`${environment.endpoint}/reserva/valor-dolares?numeroReserva=${numeroReserva}`, this.http.optsName('Obtener reservas'));
  }

  public cobrarReserva(numeroReserva: number) {
    return this.http.doPost<ComandoReserva,CobroReserva>(`${environment.endpoint}/reserva/cobrar?numeroReserva=${numeroReserva}`, null ,this.http.optsName('Obtener reservas'));
  }
  
}
