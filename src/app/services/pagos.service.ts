import { Injectable } from '@angular/core';
import { Pago } from '../models/Pagos';
import { Observable } from 'rxjs';
import { PAY_LIST } from './data_list';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  pagos_list: Pago[] = PAY_LIST
  constructor(
    private http: HttpClient
  ) { }

  /**
   *Pago realizado por el usuario
   *
   * @param {FormData} sale
   * @return {*}  {Observable<Pago>}
   * @memberof PagosService
   */
  createUserPayment(sale: FormData): Observable<{pago_usuario: Pago}> {
    return this.http.post<{pago_usuario: Pago}>(`${environment.host}/pago-usuario`, sale);
  }


  listPayments(id_user: number | string = ''): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${environment.host}/pago-usuario/${id_user}`);
  }

  validatePaymentProcess(pago: Pago): Observable<Pago> {
    let { id: pago_id, status } = pago
    return this.http.put<Pago>(`${environment.host}/pago-usuario/validar`, { pago_id, status });
  }
}
