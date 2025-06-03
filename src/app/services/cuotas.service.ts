import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuota } from '../models/Cuota';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CuotasService {
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Genera una cuota en base a los gastos de la fecha indicada 
   * retorna un array de cuotas con todos lo apartamentos y es desglose 
   *
   * @param {Date} fecha_cuota
   * @return {*}  {Observable<Cuota[]>}
   * @memberof CuotasService
   */
  generarCuotaPorFecha(fecha_cuota: string): Observable<Cuota> {
    return this.http.post<Cuota>(`${environment.host}/cuotas/generar`, { fecha: fecha_cuota });
  }

  generarCuotaPorUsuario(id_user: number): Observable<Cuota> {
    return this.http.get<Cuota>(`${environment.host}/cuotas/${id_user}`);

  }

  listarCuotas(): Observable<Cuota[]> {
    return this.http.get<Cuota[]>(`${environment.host}/cuotas`);
  }

  guardarCuota(fecha_cuota: string): Observable<Cuota> {
    return this.http.post<Cuota>(`${environment.host}/cuotas/guardar`, { fecha: fecha_cuota });
  }

  eliminarCuota(cuota_id: number): Observable<any> {
    return this.http.delete<any>(`${environment.host}/cuotas/${cuota_id}`);
  }
}
