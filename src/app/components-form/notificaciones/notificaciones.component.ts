import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { MaterialModule } from 'src/app/material.module';
import { NotificationUser, TypeNotification } from 'src/app/models/Notificacion';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/Usuarios';
import { LoadingComponent } from "../loading/loading.component";
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificaciones',
  imports: [
    ButtonsHeaderComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    CommonModule
  ],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.scss',
})

export class NotificacionesComponent {
  loading: boolean = false

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dialogRef: MatDialogRef<any>;

  notificacion: NotificationUser = new NotificationUser();
  notificaciones: NotificationUser[] = [];
  dataSource = new MatTableDataSource<NotificationUser>(this.notificaciones);

  columnas: string[] = [
    'titulo',
    'tipo',
    'leida_at',
    'nombre',
    'piso',
    'letra',
    'created_at',
    'budget'];
  usuarios: Usuario[] = []
  /**
   *Copia de usuarios
   *
   * @type {Usuario[]}
   * @memberof NotificacionesComponent
   */
  copy_usuarios: Usuario[] = []

  /**
   *filtrado de usuarios
   *
   * @memberof NotificacionesComponent
   */
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
    private usuariosService: UsuariosService,
    private notificacionesService: NotificacionesService
  ) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.usuariosService.listUsers().subscribe(u => this.copy_usuarios = this.usuarios = u)

    this.loading = true
    this.notificacionesService.listarNotificaciones().subscribe({
      next: (notificaciones) => {
        this.dataSource.data = notificaciones
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      },
    })

    //*Filtrado del autocomplete
    this.search_user.valueChanges.subscribe(value => {
      const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
      this.copy_usuarios = this.usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(filterValue) ||
        usuario.piso?.toString().toLowerCase().includes(filterValue)
      );
    });
  }
  openModal(element?: NotificationUser) {
    if (element) {
      //!SE TIENE QUE VALIDAR NO CREAR PROPIETARIO
      this.notificacion = { ...element }
      let usuario = this.usuarios.find(u => u.id == this.notificacion.id_usuario) as Usuario
      

      //*Setear el autocomplete
      this.search_user.setValue(usuario as any);
      this.onSelect(usuario)

    } else {
      this.notificacion = new NotificationUser()
    }

    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }


  refrescarNotificacion() {
    this.notificacion = new NotificationUser()
  }

  onSelect(user: Usuario) {
    this.notificacion.id_usuario = user.id;
    this.notificacion.nombre = user.nombre
    this.notificacion.piso = user.piso
    this.notificacion.letra = user.letra

  }

  displayUser(user: Usuario): string {
    return user?.nombre || '';
  }

  guardarNotificacion() {
    this.loading = true
    this.notificacionesService.createNotification(this.notificacion).subscribe({
      next: (notificacion) => {
        this.notificacion.id = notificacion.id
        this.notificacion.nombre = notificacion.nombre
        this.dataSource.data = [notificacion, ...this.dataSource.data];
        this.toastService.show('Notificación creada correctamente');
        this.dialogRef.close();
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      },
    })
  }

  actualizarNotificacion() {
    this.loading = true
    this.notificacionesService.updateNotification(this.notificacion).subscribe({
      next: (notificacion) => {
        console.log(this.notificacion);
        
        this.dataSource.data = this.dataSource.data.map(n => n.id === this.notificacion.id ? this.notificacion : n);
        this.toastService.show('Notificación actualizada correctamente');
        this.dialogRef.close();
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      },
    })
  }

  dynamicNotificationCreation() {
    if (this.notificacion.id != 0) {
      this.actualizarNotificacion()
    } else {
      this.guardarNotificacion()
    }
  }

  filtro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

   eliminarNotificacion(id: number) {
    this.loading = true
    this.notificacionesService.deleteNotification(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(n => n.id !== id);
        this.toastService.show('Notificación eliminada correctamente');
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }
}
