import { Injectable } from '@angular/core';
import { ReportConfiguration } from '../interfaces/Reports';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(
    private http: HttpClient
  ) { }

  reporteApartamentos(): Observable<Blob> {
    return this.http.get(`${environment.host}/reporte/apartamentos`, { responseType: 'blob' });
  }

  nominaProveedores(): Observable<Blob> {
    return this.http.get(`${environment.host}/reporte/nomina`, { responseType: 'blob' });
  }
  gastos(configuration: ReportConfiguration): Observable<Blob> {
    return this.http.post(`${environment.host}/reporte/gastos`, configuration, { responseType: 'blob' });
  }
  morosos(): Observable<Blob> {
    return this.http.get(`${environment.host}/reporte/morosos`, { responseType: 'blob' });
  }

  morososPersonal(): Observable<Blob> {
    return this.http.get(`${environment.host}/reporte/morosos-personal`, { responseType: 'blob' });
  }
  constanciaResidencia(): Observable<Blob> {
    return this.http.get(`${environment.host}/reporte/constancia-residencia`, { responseType: 'blob' });
  }
  constanciaSolvencia(): Observable<Blob> {
    return this.http.get(`${environment.host}/reporte/constancia-solvencia`, { responseType: 'blob' });
  }
}  
