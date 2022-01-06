import { HttpService } from '@core-service/http.service';
import { HabitacionService } from '@habitacion//shared/service/habitacion.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './../../../../shared/services/alert/alert.service';
import { ReservaService } from './../../shared/service/reserva.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';


import { CrearReservaComponent } from './crear-reserva.component';
import { Habitacion } from '@habitacion/shared/model/habitacion';
import { of, throwError } from 'rxjs';

describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;
  let reservaServicio: ReservaService;
  let alertaServicio: AlertService;
  let habitacionServicio: HabitacionService;
  let habitacion: Habitacion;
  let habitaciones: [Habitacion];


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrearReservaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        ReservaService,
        AlertService,
        HabitacionService,
        HttpService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearReservaComponent);
    component = fixture.componentInstance;
    reservaServicio = TestBed.inject(ReservaService);
    alertaServicio = TestBed.inject(AlertService);
    habitacionServicio = TestBed.inject(HabitacionService);
    habitacion = new Habitacion(1, "101", 1, 100, "prueba")
    habitaciones = [habitacion];
    spyOn(habitacionServicio, 'consultar').and.returnValue(of(habitaciones));
    spyOn(alertaServicio, "alert")
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.formularioCrearReserva.valid).toBeFalsy();
  });

  it('crear reserva falido', () => {
    const errorLanzado = new ErrorService();
    errorLanzado.mensaje = "prueba"
    const errorServicio = new ErrorService();
    errorServicio.error = errorLanzado
    spyOn(reservaServicio, 'crearReserva').and.returnValue(throwError(errorServicio));

    expect(component.formularioCrearReserva.valid).toBeFalsy();

    component.formularioCrearReserva.controls.nombre.setValue('Juen');
    component.formularioCrearReserva.controls.fechaEntrada.setValue('2022/01/01');
    component.formularioCrearReserva.controls.numeroHabitacion.setValue('200');
    component.formularioCrearReserva.controls.fechaSalida.setValue('2022/01/02');
    expect(component.formularioCrearReserva.valid).toBeTruthy();

    component.crearReserva()

    expect(alertaServicio.alert).toHaveBeenCalledWith("Reserva no creada",errorServicio.error.mensaje,"error");
  });


  it('crear reserva', () => {
    spyOn(reservaServicio, 'crearReserva').and.returnValue(of(1));

    expect(component.formularioCrearReserva.valid).toBeFalsy();

    component.formularioCrearReserva.controls.nombre.setValue('Juan');
    component.formularioCrearReserva.controls.fechaEntrada.setValue('2022/01/01');
    component.formularioCrearReserva.controls.numeroHabitacion.setValue('200');
    component.formularioCrearReserva.controls.fechaSalida.setValue('2022/01/02');

    expect(component.formularioCrearReserva.valid).toBeTruthy();

    component.crearReserva()

    expect(alertaServicio.alert).toHaveBeenCalledWith("Reserva creada",`La reserva 1 fue creada con exito`,"success");
  });

  class ErrorService extends Error {
    error: ErrorService;
    mensaje: string;
  }

});
