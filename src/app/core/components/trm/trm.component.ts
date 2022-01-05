import { TrmService } from '../../../shared/services/trm/trm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trm',
  templateUrl: './trm.component.html',
  styleUrls: ['./trm.component.css']
})
export class TrmComponent implements OnInit {

  valorTrm: number;

  constructor(private trmServicio: TrmService) { }

  ngOnInit(): void {
    this.trmServicio.consultar().subscribe((trm: number)=>this.valorTrm=trm)
  }

}
