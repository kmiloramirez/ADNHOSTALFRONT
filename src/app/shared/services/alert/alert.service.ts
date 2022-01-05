import { CobroReserva } from './../../../feature/reserva/shared/modelo/cobro-reserva';
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alert(title, text, icon = 'success'): void {
    Swal.fire(title, text, icon as SweetAlertIcon);
  }

  alertDolares(cobroReserva: CobroReserva) {
    Swal.fire({
      title: 'Cobro con dolares',
      icon: 'info',
      html:
        '<div class="input-group mb-3"><div class="input-group-prepend"> <label class="input-group-text" id="numeroReserva " >Numero reserva</label> </div>' +
        `<input class="form-control" value=${cobroReserva.numeroReserva} disabled>` +
        '</div>' +
        '<div class="input-group mb-3"><div class="input-group-prepend"> <label class="input-group-text" id="fechaSalida " >Fecha salida</label> </div>' +
        `<input class="form-control" value=${cobroReserva.fechaSalida} disabled>` +
        '</div>' +
        '<div class="input-group mb-3"><div class="input-group-prepend"> <label class="input-group-text" id="trm " >Trm</label> </div>' +
        `<input class="form-control" value=${cobroReserva.trm} disabled>` +
        '</div>' +
        '<div class="input-group mb-3"><div class="input-group-prepend"> <label class="input-group-text" id="costoTotalPesos " >Costo total pesos</label> </div>' +
        `<input class="form-control" value=${cobroReserva.costoTotalPesos} disabled>` +
        '</div>' +
        '<div class="input-group mb-3"><div class="input-group-prepend"> <label class="input-group-text" id="costoTotalDolares " >Costo total dolares</label> </div>' +
        `<input class="form-control" value=${cobroReserva.costoTotalDolares} disabled>` +
        '</div>',
      showCloseButton: true,
      focusConfirm: false
    })


  }

}
