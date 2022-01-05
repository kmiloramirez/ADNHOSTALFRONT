import { HabitacionService } from './../../shared/service/habitacion.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Habitacion } from '@habitacion/shared/model/habitacion';

@Component({
  selector: 'app-listar-habitacion',
  templateUrl: './listar-habitacion.component.html',
  styleUrls: ['./listar-habitacion.component.css']
})
export class ListarHabitacionComponent implements OnInit {

  public listaHabitaciones: Observable<Habitacion[]>;

  constructor(private habitacionServicio: HabitacionService) { }

  ngOnInit(): void {
    this.listaHabitaciones= this.habitacionServicio.consultar();
  }

}
