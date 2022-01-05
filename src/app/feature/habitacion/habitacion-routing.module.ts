import { CrearHabitacionComponent } from './components/crear-habitacion/crear-habitacion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { ListarHabitacionComponent } from './components/listar-habitacion/listar-habitacion.component';

const routes: Routes = [
  {
    path: '',
    component: HabitacionComponent,
    children: [
      {
        path: 'crear',
        component: CrearHabitacionComponent
      },
      {
        path: 'listar',
        component: ListarHabitacionComponent
      },

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitacionRoutingModule { }