import { ReservaService } from './../../shared/service/reserva.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {


  constructor(protected reservaService: ReservaService) { }

  ngOnInit(): void { }

}
