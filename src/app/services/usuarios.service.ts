import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Roles, Usuario } from '../models/Usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  listUsers() {
    return this.http.get<Usuario[]>(`${environment.host}/users`);
  }

  gerCargos(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${environment.host}/roles`);
  }
  createDynamicUser(user: Usuario) {
    return this.http.post<Usuario>(`${environment.host}/users`, user);
  }
  deleteUser(id: number) {
    return this.http.delete<number>(`${environment.host}/users/${id}`);
  }
}
