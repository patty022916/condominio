import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/Provedores';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvedoresService {

  constructor(
    private http: HttpClient
  ) { }

  crearProveedor(provedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${environment.host}/proveedores`, provedor);
  }

  listarProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${environment.host}/proveedores`);
  }

  actualizarProveedor(provedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${environment.host}/proveedores/${provedor.id}`, provedor);
  }

  eliminarProvedor(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.host}/proveedores/${id}`);
  }
}
