import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Apartamentos } from '../models/Apartamentos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartamentosService {

  constructor(
    private http: HttpClient
  ) { }

  listarApartamentos(): Observable<Apartamentos[]> {
    return this.http.get<Apartamentos[]>(`${environment.host}/apartamentos`);
  }

  /**
   *Asigna un inquilino a un apartamento
   *
   * @param {number} id_inquilino inquilino 
   * @param {number} id_apartamento apartamento
   * @return {*}  {Observable<Apartamentos[]>}
   * @memberof ApartamentosService
   */
  asignarInquilino(id_inquilino: number, id_apartamento: number): Observable<Apartamentos> {
    return this.http.post<Apartamentos>(`${environment.host}/apartamentos/asignar-inquilino`,
      { id_inquilino, id_apartamento });
  }
}
