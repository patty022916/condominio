import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationUser } from '../models/Notificacion';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(
    private http: HttpClient
  ) { }

  createNotification(notificacion: NotificationUser) {
    return this.http.post<NotificationUser>(`${environment.host}/notificaciones`, notificacion);
  }

  listarNotificaciones(): Observable<NotificationUser[]> {
    return this.http.get<NotificationUser[]>(`${environment.host}/notificaciones`);
  }

  updateNotification(notificacion: NotificationUser): Observable<NotificationUser> {
    return this.http.put<NotificationUser>(`${environment.host}/notificaciones/${notificacion.id}`, notificacion);
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.host}/notificaciones/${id}`);
  }

  getNotificationsForUser(user_id: number): Observable<NotificationUser[]> {
    return this.http.get<NotificationUser[]>(`${environment.host}/notificaciones/user/${user_id}`);
  }

  marcarNotificacionesComoLeidas(notificaciones: NotificationUser[]): Observable<NotificationUser[]> {
    return this.http.post<NotificationUser[]>(`${environment.host}/notificaciones/marcar-leidas`, notificaciones);
  }
}
