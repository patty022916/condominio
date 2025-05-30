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
}
