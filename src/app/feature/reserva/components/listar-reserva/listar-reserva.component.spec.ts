import { CobroReserva } from './../../shared/modelo/cobro-reserva';
import { AlertService } from './../../../../shared/services/alert/alert.service';
import { HttpService } from './../../../../core/services/http.service';
import { ReservaService } from './../../shared/service/reserva.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReservaComponent } from './listar-reserva.component';
import { Reserva } from '@reserva/shared/modelo/reserva';
import { of, throwError } from 'rxjs';

describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;
  let reservaServicio: ReservaService;
  let reserva: Reserva;
  let alertaServicio: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarReservaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [ReservaService,HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReservaComponent);
    component = fixture.componentInstance;
    reservaServicio= TestBed.inject(ReservaService);
    alertaServicio= TestBed.inject(AlertService);
    spyOn(reservaServicio,'consultarReservas');
    spyOn(alertaServicio,'alert');
    spyOn(component,'editarReserva');
    reserva = new Reserva(1,"Juan Camilo Ramirez","2022/01/01","100","2022/01/02","2022/01/02",100,"reservado");
    component.listaReservas = of([reserva]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(reservaServicio.consultarReservas).toHaveBeenCalled()
  });

  it('eliminar reserva',() =>{
    spyOn(reservaServicio,'eliminar').and.returnValue(of(true));

    component.eliminar(1);

    expect(reservaServicio.eliminar).toHaveBeenCalled()
    expect(alertaServicio.alert).toHaveBeenCalledWith("Reserva eliminada",
    `La reserva 1 fue eliminada con exito`)
  })

  it('eliminar reserva con error',() =>{
    const errorLanzado = new ErrorService();
    errorLanzado.mensaje = "prueba"
    const errorServicio = new ErrorService();
    errorServicio.error = errorLanzado
    spyOn(reservaServicio,'eliminar').and.returnValue(throwError(errorServicio));

    component.eliminar(1);

    expect(reservaServicio.eliminar).toHaveBeenCalled()
    expect(alertaServicio.alert).toHaveBeenCalledWith("No se pudo eliminar la reserva",
    errorServicio.error.mensaje,
   "error")
  })

  it('activar reserva',() =>{
    spyOn(reservaServicio,'editar').and.returnValue(of(true));

    component.activaReserva(1,"juan");

    expect(reservaServicio.editar).toHaveBeenCalled()
    expect(alertaServicio.alert).toHaveBeenCalledWith("Reserva activa",
    `La reserva 1 fue activada con exito`)
  })

  it('activar reserva con error',() =>{
    const errorLanzado = new ErrorService();
    errorLanzado.mensaje = "prueba"
    const errorServicio = new ErrorService();
    errorServicio.error = errorLanzado
    spyOn(reservaServicio,'editar').and.returnValue(throwError(errorServicio));

    component.activaReserva(1,"juan");

    expect(reservaServicio.editar).toHaveBeenCalled()
    expect(alertaServicio.alert).toHaveBeenCalledWith("No se pudo activar la reserva",
    errorServicio.error.mensaje,
   "error")
  })

  it('termiar reserva',() =>{
    const cobro =new CobroReserva()
    spyOn(reservaServicio,'cobrarReserva').and.returnValue(of(cobro));
    spyOn(alertaServicio,'alertDolares');

    component.terminarReserva(1);

    expect(reservaServicio.cobrarReserva).toHaveBeenCalled()
    expect(alertaServicio.alertDolares).toHaveBeenCalledWith(cobro)
  })

  it('termiar reserva con error',() =>{
    const errorLanzado = new ErrorService();
    errorLanzado.mensaje = "prueba"
    const errorServicio = new ErrorService();
    errorServicio.error = errorLanzado
    spyOn(reservaServicio,'cobrarReserva').and.returnValue(throwError(errorServicio));

    component.terminarReserva(1);

    expect(reservaServicio.cobrarReserva).toHaveBeenCalled()
    expect(alertaServicio.alert).toHaveBeenCalledWith("No se pudo terminar la reserva",
    errorServicio.error.mensaje,
   "error")
  })


  class ErrorService extends Error {
    error: ErrorService;
    mensaje: string;
  }
});
