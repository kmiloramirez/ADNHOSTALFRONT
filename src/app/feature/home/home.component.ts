import { TrmService } from '../../shared/services/trm/trm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fecha: Date;
  valorTrm: number;

  constructor(private trmServicio: TrmService) { }

  ngOnInit(): void {
    this.fecha = new Date(Date.now());
    this.trmServicio.consultar().subscribe((trm: number)=>this.valorTrm=trm)
  }
}
