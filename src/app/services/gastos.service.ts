import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { Gasto } from '../models/Gastos';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  constructor(
    private http: HttpClient
  ) { }

  crearGasto(gasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(`${environment.host}/gasto`, gasto);
  }

  actualizarGasto(gasto: Gasto): Observable<Gasto> {
    return this.http.put<Gasto>(`${environment.host}/gasto/${gasto.id}`, gasto);
  }

  listarGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${environment.host}/gasto`);
  }

  eliminarGasto(id: number): Observable<Gasto> {
    return this.http.delete<Gasto>(`${environment.host}/gasto/${id}`);
  }
}
