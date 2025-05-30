import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Usuario } from 'src/app/models/Usuarios';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { NotificationUser } from 'src/app/models/Notificacion';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  user: Usuario = new Usuario();
  notificaciones: NotificationUser[] = [];

  constructor(
    private router: Router,
    private notificacionesService: NotificacionesService,
    private toastService: ToastService
  ) { }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user') as string);

    this.notificacionesService.getNotificationsForUser(this.user.id).subscribe(notificaciones => this.notificaciones = notificaciones);
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('is_logged');
    this.router.navigate(['login']);
  }

  /**
   * Calculates the number of unread notifications.
   * 
   * @returns The count of notifications that have not been marked as read.
   */

  get filterNotifiersNotLeidas(): number {
    return this.notificaciones.filter(notificacion => notificacion.leida_at == null).length;
  }
  

  marcarNotificacionesComoLeidas() {
    let notificaciones_no_leidas = this.notificaciones.filter(notificacion => notificacion.leida_at == null)
    this.notificacionesService.marcarNotificacionesComoLeidas(notificaciones_no_leidas).subscribe({
      next: (value) => {
        this.notificaciones.map(notificacion => notificacion.leida_at = new Date())
      }, error: (err) => {
        this.toastService.show(err.error.error);
      },
    });
  }

  deleteNotification(id: number) {
    this.notificacionesService.deleteNotification(id).subscribe({
      next: () => {
        this.notificaciones = this.notificaciones.filter(notificacion => notificacion.id !== id);
        this.toastService.show('Notificación eliminada correctamente');
      },
      error: (err) => {
        this.toastService.show(err.error.error);
      }
    })

  }
}