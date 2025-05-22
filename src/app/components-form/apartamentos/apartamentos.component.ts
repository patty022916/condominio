import { Component, ViewChild } from '@angular/core';
import { LoadingComponent } from "../loading/loading.component";
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Apartamentos } from 'src/app/models/Apartamentos';
import { ApartamentosService } from 'src/app/services/apartamentos.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apartamentos',
  imports: [
    CommonModule,
    MaterialModule,
    LoadingComponent,
    FormsModule
  ],
  templateUrl: './apartamentos.component.html',
  styleUrl: './apartamentos.component.scss'
})
export class ApartamentosComponent {
  loading: boolean = false
  @ViewChild(MatPaginator) paginator!: MatPaginator

  apartamentos: Apartamentos[] = []
  dataSource = new MatTableDataSource<Apartamentos>(this.apartamentos);

  columnasFiltro = { piso: true, letra: true, propietario: true, inquilino: true };
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
    private toastService: ToastService
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
}
