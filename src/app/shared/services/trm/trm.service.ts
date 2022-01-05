import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrmService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<number>(`${environment.endpoint}/trm`, this.http.optsName('Obtener Trm Del Dia'));
  }
}


