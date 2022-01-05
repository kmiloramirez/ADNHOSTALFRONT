import { NgModule } from '@angular/core';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaComponent } from './components/reserva/reserva.component';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';
import { SharedModule } from '@shared/shared.module';
import { EditarReservaComponent } from './components/editar-reserva/editar-reserva.component';



@NgModule({
  declarations: [
    ReservaComponent,
    CrearReservaComponent,
    ListarReservaComponent,
    EditarReservaComponent,
  
  ],
  imports: [
    ReservaRoutingModule,
    SharedModule
  ]
})

export class ReservaModule { }


