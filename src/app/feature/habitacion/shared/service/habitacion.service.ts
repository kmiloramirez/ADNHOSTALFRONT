import { ComandoRespuesta } from './../../../../shared/modelo/comando-respuesta';
import { ComandoHabitacion } from './../model/comando-habitacion';
import { Habitacion } from './../model/habitacion';
import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  constructor(protected http :HttpService) { }

  public consultar() {
    return this.http.doGet<Habitacion[]>(`${environment.endpoint}/habitacion`, this.http.optsName('Obtener habitaciones'));
  }

  public crearHabitacion(comandoHabitacion: ComandoHabitacion) {
    return this.http.doPost<ComandoHabitacion,ComandoRespuesta>(`${environment.endpoint}/habitacion`,comandoHabitacion, this.http.optsName('Crear habitaciones'));
  }
}
