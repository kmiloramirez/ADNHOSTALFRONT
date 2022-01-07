import { CobroReserva } from './../modelo/cobro-reserva';
import { ComandoRespuesta } from './../../../../shared/modelo/comando-respuesta';
import { ComandoReserva } from './../modelo/comando-reserva';
import { Reserva } from '@reserva/shared/modelo/reserva';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ReservaService } from './reserva.service';
import { HttpResponse } from '@angular/common/http';

describe('ReservaService', () => {
  let service: ReservaService;
  let httpMock: HttpTestingController;


  const apiEndpointReservaConsultarReservas = `${environment.endpoint}/reserva/lista-reservas`;
  const apiEndpointReservaConsulta = `${environment.endpoint}/reserva?numeroReserva=1`;
  const apiEndpointReservaEliminar = `${environment.endpoint}/reserva?numeroReserva=1`;
  const apiEndpointReservaCrear = `${environment.endpoint}/reserva`;
  const apiEndpointReservaEditar = `${environment.endpoint}/reserva/modificar`;
  const apiEndpointReservaConsultarDolares = `${environment.endpoint}/reserva/valor-dolares?numeroReserva=1`;
  const apiEndpointReservaCobrar = `${environment.endpoint}/reserva/cobrar?numeroReserva=1`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('deberia listar Reservas', () => {
    const dummyReserva = [
      new Reserva(1,"Juan","2022/01/01","101","2022/01/02","2022/01/01",100,"reservado"), 
      new Reserva(2,"Juan","2022/01/01","102","2022/01/02","2022/01/01",100,"reservado")
    ];
    service.consultarReservas().subscribe(reservas => {
      expect(reservas.length).toBe(2);
      expect(reservas).toEqual(dummyReserva);
    });
    const req = httpMock.expectOne(apiEndpointReservaConsultarReservas);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReserva);
  });

  it('deberia consultar reserva ', () => {
    const dummyReserva = new Reserva(1,"Juan","2022/01/01","101","2022/01/02","2022/01/01",100,"reservado");
    service.consultar(1).subscribe(reservas => {
      expect(reservas).toEqual(dummyReserva);
    });
    const req = httpMock.expectOne(apiEndpointReservaConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReserva);
  });

  it('deberia eliminar reserva ', () => {
    service.eliminar(1).subscribe(respuesta => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointReservaEliminar);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia crear reserva ', () => {
    const comandoReseva = new ComandoReserva();
    const comandoRespuesta = new ComandoRespuesta(1);
    service.crearReserva(comandoReseva).subscribe(respuesta => {
      expect(respuesta).toEqual(comandoRespuesta);
    });
    const req = httpMock.expectOne(apiEndpointReservaCrear);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<ComandoRespuesta>({body: comandoRespuesta}));
  });

  it('deberia modificar el nombre  reserva ', () => {
    const comandoReseva = new ComandoReserva();
    service.editar(comandoReseva).subscribe(respuesta => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointReservaEditar);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia consultar valor dolares reserva ', () => {
    const dummyReservaCobro = new CobroReserva();
    service.consultarDolares(1).subscribe(reservas => {
      expect(reservas).toEqual(dummyReservaCobro);
    });
    const req = httpMock.expectOne(apiEndpointReservaConsultarDolares);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReservaCobro);
  });

  it('deberia terminar reserva ', () => {
    const dummyReservaCobro = new CobroReserva();
    service.cobrarReserva(1).subscribe(respuesta => {
      expect(respuesta).toEqual(dummyReservaCobro);
    });
    const req = httpMock.expectOne(apiEndpointReservaCobrar);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<CobroReserva>({body: dummyReservaCobro}));
  });
});
