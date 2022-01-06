import { HttpService } from '@core-service/http.service';
import { HabitacionService } from '@habitacion//shared/service/habitacion.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHabitacionComponent } from './listar-habitacion.component';
import { Habitacion } from '@habitacion/shared/model/habitacion';
import { of } from 'rxjs';

describe('ListarHabitacionComponent', () => {
  let component: ListarHabitacionComponent;
  let fixture: ComponentFixture<ListarHabitacionComponent>;
  let habitacionServicio: HabitacionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarHabitacionComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [HabitacionService,HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHabitacionComponent);
    component = fixture.componentInstance;
    habitacionServicio = TestBed.inject(HabitacionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe consular habitaciones', () => {
    const habitacion = new Habitacion(1,"100",1,100,"prueba");
    const habitaciones = [habitacion];
    spyOn(habitacionServicio,'consultar').and.returnValue(of(habitaciones));
    expect(component).toBeTruthy();
    component.ngOnInit()
    expect(habitacionServicio.consultar).toHaveBeenCalled();
  });
});
