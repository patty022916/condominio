import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { MaterialModule } from 'src/app/material.module';
import { NotificationUser, TypeNotification } from 'src/app/models/Notificacion';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/Usuarios';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-notificaciones',
  imports: [
    ButtonsHeaderComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent
  ],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.scss'
})

export class NotificacionesComponent {
  loading: boolean = false

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;

  notificacion: NotificationUser = new NotificationUser();
  usuarios: Usuario[] = []
  copy_usuarios: Usuario[] = []
  search_user = new FormControl('');
  tipos_notificaciones: { id: TypeNotification, nombre: string }[] = [
    { id: 'general', nombre: 'General' },
    { id: 'cobro', nombre: 'Cobro' },
    { id: 'reunion', nombre: 'Reunion' },
    { id: 'alerta', nombre: 'Alerta' },
  ];

  constructor(
    public dialog: MatDialog,
    private toastService: ToastService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.usuariosService.listUsers().subscribe(u => this.copy_usuarios = this.usuarios = u)

    this.search_user.valueChanges.subscribe(value => {
      const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
      this.copy_usuarios = this.usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(filterValue) ||
        usuario.piso?.toString().toLowerCase().includes(filterValue)
      );
    });
  }
  openModal() {
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }


  refrescarNotificacion() { }

  onSelect(user: Usuario) {
    this.notificacion.id_usuario = user.id;

  }

  displayUser(user: Usuario): string {
    return user?.nombre || '';
  }
}
