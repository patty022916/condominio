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
}
