import { HttpService } from '@core-service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './../../../../shared/services/alert/alert.service';
import { ReservaService } from './../../shared/service/reserva.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { EditarReservaComponent } from './editar-reserva.component';
import { Reserva } from '@reserva/shared/modelo/reserva';
import { of, throwError } from 'rxjs';

describe('EditarReservaComponent', () => {
  let component: EditarReservaComponent;
  let fixture: ComponentFixture<EditarReservaComponent>;
  let reservaServicio: ReservaService;
  let alertaServicio: AlertService;
  let reserva: Reserva;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      declarations: [ EditarReservaComponent ],
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
        HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarReservaComponent);
    component = fixture.componentInstance;
    reservaServicio = TestBed.inject(ReservaService);
    alertaServicio = TestBed.inject(AlertService);
    reserva = new Reserva(1,"Juan Camilo Ramirez","2022/01/01","100","2022/01/02","2022/01/02",100,"reservado");
    spyOn(alertaServicio, "alert")
    spyOn(reservaServicio, 'consultar').and.returnValue(of(reserva));
    spyOn(reservaServicio, 'editar').and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    component.formularioEditarReserva.controls.nombre.setValue('');

    expect(component.formularioEditarReserva.valid).toBeFalsy();
  });

  it('reserva no encontrada', () => {
    const errorLanzado = new ErrorService();
    errorLanzado.mensaje = "prueba"
    const errorServicio = new ErrorService();
    errorServicio.error = errorLanzado
    reservaServicio.consultar = jasmine.createSpy().and.returnValue(throwError(errorServicio));


    component.ngOnInit()

    expect(alertaServicio.alert).toHaveBeenCalledWith("No se pudo cargar la reserva",errorServicio.error.mensaje,"error");
  });

  it('reserva cambiar nombre error ', () => {
    const errorLanzado = new ErrorService();
    errorLanzado.mensaje = "prueba"
    const errorServicio = new ErrorService();
    errorServicio.error = errorLanzado
    reservaServicio.editar =  jasmine.createSpy().and.returnValue(throwError(errorServicio)); 

    component.ngOnInit()
    component.editarReserva()

    expect(alertaServicio.alert).toHaveBeenCalledWith("No se pudo cambiar el nombre de la reserva",errorServicio.error.mensaje,"error");
  });

  it('reserva cambiar nombre  ', () => {

    component.formularioEditarReserva.controls.nombre.setValue('Juan');

    expect(component.formularioEditarReserva.valid).toBeTruthy();

    component.editarReserva()

    expect(alertaServicio.alert).toHaveBeenCalledWith("Se cambiar el nombre de la reserva",`Se modifico exitosamente el nombre en la reserva: 1`);
  });
  class ErrorService extends Error {
    error: ErrorService;
    mensaje: string;
  }
  
});


