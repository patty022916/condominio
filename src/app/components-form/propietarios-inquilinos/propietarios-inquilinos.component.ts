import { Component, Input, input, TemplateRef, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { LoadingComponent } from '../loading/loading.component';
import { ButtonsHeaderComponent } from '../buttons-header/buttons-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Roles, Usuario } from 'src/app/models/Usuarios';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastService } from 'src/app/services/toast.service';
import { ModeComponent } from 'src/app/interfaces/Forms';

@Component({
  selector: 'app-propietarios-inquilinos',
  imports: [
    MaterialModule,
    LoadingComponent,
    ButtonsHeaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './propietarios-inquilinos.component.html',
  styleUrl: './propietarios-inquilinos.component.scss'
})
export class PropietariosInquilinosComponent {

  /**
   *Modo del componente
   *
   * @type {ModeComponent}
   * @memberof PropietariosInquilinosComponent
   */
  @Input() mode_component: ModeComponent = 'form'

  //CERRARDIGALO
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  //PAGINADOR
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dialogRef: MatDialogRef<any>;
  hide = true;
  hide2 = true
  //ARREGLO DE USUAIORS
  usuarios: Usuario[] = []
  cargos: Roles[] = []
  //DATASORUCE DE LA TABLA
  dataSource = new MatTableDataSource<Usuario>(this.usuarios);

  loading: boolean = false
  columnas: string[] = ['nombre', 'email', 'telefono', 'cargo'];

  usuario: Usuario = new Usuario()

  constructor(
    public dialog: MatDialog,
    private usuariosService: UsuariosService,
    private toastService: ToastService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {

    if (this.mode_component == 'form') this.columnas.push('budget')

    //** FILTRO DE TABLA **//
    this.dataSource.filterPredicate = (data: Usuario, filtro: string) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filtro);
    };


    this.loading = true
    this.usuariosService.listUsers().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios.filter(user => user.id_rol === 2 || user.id_rol === 3)
        this.loading = false
      },
      error: (err) => {
        this.loading = false

      },
    })

    this.loading = true
    this.usuariosService.gerCargos().subscribe({
      next: (cargos) => {

        this.cargos = cargos.filter(cargo => cargo.id == 3 || cargo.id == 2)

        this.usuario.id_rol = cargos[0].id
        this.loading = false
      },
      error: (err) => {
        this.loading = false
      }
    })
  }
  /**
   * Filtra la tabla seg n el valor ingresado por el usuario.
   * @param event Evento que se dispara al cambiar el valor del input de filtrado.
   */
  filtro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  /**
 * Opens a modal dialog using the specified dialog template.
 * The dialog reference is stored for further operations.
 */
  openModal(element?: Usuario) {
    if (element) {
      //!SE TIENE QUE VALIDAR NO CREAR PROPIETARIO
      this.usuario = { ...element }
      this.usuario.confirm_password = this.usuario.password
    } else {

      this.usuario = new Usuario()
      this.usuario.id_rol = this.cargos[0].id
    }

    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  confirmarPassword() {
    if (this.usuario.password !== this.usuario.confirm_password) {
      this.toastService.show('Las contraseñas no coinciden');
      this.usuario.confirm_password = '';
    }
  }

  guardar() {
    this.loading = true
    this.usuariosService.createDynamicUser(this.usuario).subscribe({
      next: (user) => {
        if (this.usuario.id == 0) {
          this.usuario.id = user.id
          this.dataSource.data = [user, ...this.dataSource.data];
        } else {
          this.dataSource.data = this.dataSource.data.map(u => u.id === user.id ? user : u);
        }
        this.toastService.show('Usuario creado correctamente');
        this.dialogRef.close();
        this.loading = false
      },
      error: (err) => {

        this.loading = false
        console.log(err);
        this.toastService.show(err.error.error);
      }
    })
  }
  eliminar(id: number) {
    this.loading = true
    this.usuariosService.deleteUser(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
        this.toastService.show('Usuario eliminado correctamente');
        this.loading = false
      },
      error: (err) => {
        this.toastService.show(err.error.error);
        this.loading = false
      }
    })
  }
  refrescarPropietario() {
    this.usuario = new Usuario()
    this.usuario.id_rol = this.cargos[0].id
  }

  validatePhoneLength(): boolean {
    if (!this.usuario.telefono) return false;
    // Limpiamos el teléfono para que solo tenga números
    const telefonoNumeros = this.usuario.telefono.replace(/\D/g, '');
    // Validar que tenga 11 dígitos (ejemplo para Venezuela)
    return telefonoNumeros.length === 11;
  }
}
