import { Injectable } from '@angular/core';
import { Pago } from '../models/Pagos';
import { Observable } from 'rxjs';
import { PAY_LIST } from './data_list';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  pagos_list: Pago[] = PAY_LIST
  constructor() { }

  createPaymentByUser(pago: Pago): Observable<Pago> {
    return new Observable((observer) => {
      observer.next(pago);
      observer.complete();
    });
  }
  createPaymentByCondominium(pago: Pago): Observable<Pago> {
    return new Observable((observer) => {
      observer.next(pago);
      observer.complete();
    });
  }

  listPayments(): Observable<Pago[]> {
    return new Observable((observer) => {
      observer.next(this.pagos_list);
      observer.complete();
    });
  }

}
