import { ComandoRespuesta } from './../../../../shared/modelo/comando-respuesta';
import { ComandoHabitacion } from './../model/comando-habitacion';
import { Habitacion } from 'src/app/feature/habitacion/shared/model/habitacion';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HabitacionService } from './habitacion.service';
import { HttpResponse } from '@angular/common/http';

describe('HabitacionService', () => {
  let service: HabitacionService;
  let httpMock: HttpTestingController;
  const apiEndpointHabitacionConsulta = `${environment.endpoint}/habitacion`;
  const apiEndpointHabitacion = `${environment.endpoint}/habitacion`;

  beforeEach(() => {

    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HabitacionService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(HabitacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia listar habitaciones', () => {
    const dummyHabitaciones = [
      new Habitacion(1, '101',1,100,"prueba"), new Habitacion(1, '102',1,100,"prueba")
    ];
    service.consultar().subscribe(habitaciones => {
      expect(habitaciones.length).toBe(2);
      expect(habitaciones).toEqual(dummyHabitaciones);
    });
    const req = httpMock.expectOne(apiEndpointHabitacionConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHabitaciones);
  });

  it('deberia crear una habitacion', () => {
    const comandoRespuesta = new ComandoRespuesta(1);
    const dummyComandoHabitacion = new ComandoHabitacion('101',1,100,"prueba");
    service.crearHabitacion(dummyComandoHabitacion).subscribe((respuesta) => {
      expect(respuesta).toEqual(comandoRespuesta);
    });
    const req = httpMock.expectOne(apiEndpointHabitacion);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<ComandoRespuesta>({body: comandoRespuesta}));
  });

});
