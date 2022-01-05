import { HabitacionRoutingModule } from './habitacion-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { ListarHabitacionComponent } from './components/listar-habitacion/listar-habitacion.component';
import { CrearHabitacionComponent } from './components/crear-habitacion/crear-habitacion.component';



@NgModule({
  declarations: [
    HabitacionComponent,
    ListarHabitacionComponent,
    CrearHabitacionComponent
  ],
  imports: [
    HabitacionRoutingModule,
    SharedModule
  ]
})
export class HabitacionModule { }
