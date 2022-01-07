import { ComandoRespuesta } from './../../../../shared/modelo/comando-respuesta';
import { of, throwError } from 'rxjs';
import { AlertService } from './../../../../shared/services/alert/alert.service';
import { waitForAsync,ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHabitacionComponent } from './crear-habitacion.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HabitacionService } from '@habitacion//shared/service/habitacion.service';
import { HttpService } from './../../../../core/services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('CrearHabitacionComponent', () => {
  let component: CrearHabitacionComponent;
  let fixture: ComponentFixture<CrearHabitacionComponent>;
  let habitacionServicio: HabitacionService;
  let alertaServicio: AlertService;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      declarations: [ CrearHabitacionComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [HabitacionService,HttpService,AlertService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHabitacionComponent);
    component = fixture.componentInstance;
    habitacionServicio = TestBed.inject(HabitacionService);
    alertaServicio = TestBed.inject(AlertService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.formularioCrearHabitacion.valid).toBeFalsy();
  });

  it('Creando habitacion', () => {
    const comandoRespuesta = new ComandoRespuesta(1);
    spyOn(habitacionServicio,'crearHabitacion').and.returnValue(of(comandoRespuesta));
    spyOn(alertaServicio,"alert")
    expect(component.formularioCrearHabitacion.valid).toBeFalsy();
    component.formularioCrearHabitacion.controls.numero.setValue('100');
    component.formularioCrearHabitacion.controls.camas.setValue(1);
    component.formularioCrearHabitacion.controls.precio.setValue(200);
    component.formularioCrearHabitacion.controls.descripcion.setValue('habitacion test');
    expect(component.formularioCrearHabitacion.valid).toBeTruthy();
    component.crearHabitacion()
    expect(alertaServicio.alert).toHaveBeenCalled();

  });

  it('Creando habitacion con error', () => {
    const errorLanzado = new ErrorService();
    errorLanzado.mensaje="prueba"
    const errorServicio= new ErrorService() ;
    errorServicio.error=errorLanzado
    spyOn(habitacionServicio,'crearHabitacion').and.returnValue(throwError(errorServicio));
    spyOn(alertaServicio,"alert")
    expect(component.formularioCrearHabitacion.valid).toBeFalsy();
    component.formularioCrearHabitacion.controls.numero.setValue('100');
    component.formularioCrearHabitacion.controls.camas.setValue(1);
    component.formularioCrearHabitacion.controls.precio.setValue(200);
    component.formularioCrearHabitacion.controls.descripcion.setValue('habitacion test');
    expect(component.formularioCrearHabitacion.valid).toBeTruthy();
    component.crearHabitacion()
    expect(alertaServicio.alert).toHaveBeenCalled();

  });

  class ErrorService extends  Error{
    error: ErrorService;
    mensaje: string;
  }
});
