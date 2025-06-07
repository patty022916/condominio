import { Component, TemplateRef, ViewChild } from '@angular/core';
import { LoadingComponent } from "../loading/loading.component";
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Apartamentos } from 'src/app/models/Apartamentos';
import { ApartamentosService } from 'src/app/services/apartamentos.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/Usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-apartamentos',
  imports: [
    CommonModule,
    MaterialModule,
    LoadingComponent,
    FormsModule,
    ButtonsHeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './apartamentos.component.html',
  styleUrl: './apartamentos.component.scss'
})
export class ApartamentosComponent {
  loading: boolean = false
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dialogRef: MatDialogRef<any>;
  apartamentos: Apartamentos[] = []

  apartamento: Apartamentos = new Apartamentos()

  usuarios: Usuario[] = []
  copy_usuarios: Usuario[] = []
  search_user = new FormControl('');

  dataSource = new MatTableDataSource<Apartamentos>(this.apartamentos);

  columnasFiltro = { piso: false, letra: false, propietario: false, inquilino: false };
  /**
   *Listado de columnas para la tabla
   *
   * @type {string[]}
   * @memberof ApartamentosComponent
   */
  columnas: string[] = [
    'piso',
    'letra',
    'propietario',
    'inquilino',
    'budget'
  ];

  constructor(
    private apartamentosService: ApartamentosService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private usuariosService: UsuariosService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {

    // Define cómo se debe filtrar dependiendo de la columna activa
    this.loading = true
    this.apartamentosService.listarApartamentos().subscribe({
      next: (apartamentos) => {
        this.dataSource.data = apartamentos
        this.loading = false
      },
      error: (err) => {
        this.toastService.show(err.error.error)
        this.loading = false
      },
    })

    this.usuariosService.listUsers().subscribe(u => this.copy_usuarios = this.usuarios = u.filter(user => user.id_rol === 2 || user.id_rol === 3))


    //*Filtrado del autocomplete
    this.search_user.valueChanges.subscribe(value => {
      const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
      this.copy_usuarios = this.usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(filterValue) ||
        usuario.piso?.toString().toLowerCase().includes(filterValue)
      );
    });
  }

  /**
   * Aplica el filtro a la tabla según el check seleccionado
   *
   * @param {string} valor
   * @memberof ApartamentosComponent
   */
  aplicarFiltro(valor: string) {
    const columnasActivas = Object.entries(this.columnasFiltro)
      .filter(([_, activo]) => activo)
      .map(([col]) => col);

    this.dataSource.filterPredicate = (dato: any, filtro: string) => {
      return columnasActivas.some(col => {
        const contenido = dato[col]?.toString().toLowerCase() || '';
        return contenido.includes(filtro.toLowerCase());
      });
    };

    this.dataSource.filter = valor.trim().toLowerCase();
  }

  openModal(element?: Apartamentos) {
    if (element) {
      this.apartamento = { ...element }
    } else {
      this.apartamento = new Apartamentos()
    }
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  guardar() {
    this.toastService.show('Apartamento guardado con éxito');
    this.dialogRef.close();
  }
  displayUser(user: Usuario): string {
    return user?.nombre || '';
  }
  onSelect(user: Usuario) {

    if (user.id == 2) this.apartamento.inquilino_id = user.id;
    if (user.id == 3) this.apartamento.propietario_id = user.id;


  }
}
