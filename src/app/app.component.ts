import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hostal Santa Marta';
  public companies: MenuItem[] = [
    { url: '/home', nombre: 'home' },
    { url: '/reserva/listar', nombre: 'reserva' },
    { url: '/habitacion/listar', nombre: 'habitacion' }
    
  ];



  
}
