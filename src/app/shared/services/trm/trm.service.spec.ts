import { HttpService } from '@core-service/http.service';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';


import { TrmService } from './trm.service';

describe('TrmService', () => {
  let service: TrmService;
  let httpMock: HttpTestingController;
  const apiEndpointTrmConsulta = `${environment.endpoint}/trm`;


  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrmService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(TrmService);
  });

  it('should be created', () => {
    const trmService: TrmService = TestBed.inject(TrmService);
    expect(trmService).toBeTruthy();
  });

  it('deberia consultar trm', () => {
    const dummyTrm= 4000;
    service.consultar().subscribe(trm => {
          expect(trm).toEqual(dummyTrm);
    });
    const req = httpMock.expectOne(apiEndpointTrmConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTrm);
  });
});
