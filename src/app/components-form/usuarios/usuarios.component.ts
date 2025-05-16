import { Component, TemplateRef, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../layouts/full/header/header.component";
import { MaterialModule } from 'src/app/material.module';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Cargo, Roles, Usuario } from 'src/app/models/Usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { LoadingComponent } from '../loading/loading.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-usuarios',
  imports: [
    MaterialModule,
    LoadingComponent,
    ButtonsHeaderComponent,
    CommonModule,
    FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
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
  columnas: string[] = ['id', 'nombre', 'email', 'telefono', 'cargo', 'budget'];

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

    //** FILTRO DE TABLA **//
    this.dataSource.filterPredicate = (data: Usuario, filtro: string) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filtro);
    };


    this.loading = true
    this.usuariosService.listUsers().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios
        this.loading = false
      },
      error: (err) => {
        this.loading = false

      },
    })

    this.loading = true
    this.usuariosService.gerCargos().subscribe({
      next: (cargos) => {
        this.cargos = cargos
        this.usuario.id_rol = cargos[4].id
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
      this.usuario = element
      this.usuario.confirm_password = this.usuario.password
    } else {
      this.usuario = new Usuario()
      this.usuario.id_rol = this.cargos[4].id
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
}
