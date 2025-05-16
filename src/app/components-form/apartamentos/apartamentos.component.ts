import { Component, ViewChild } from '@angular/core';
import { LoadingComponent } from "../loading/loading.component";
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Apartamentos } from 'src/app/models/Apartamentos';
import { ApartamentosService } from 'src/app/services/apartamentos.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-apartamentos',
  imports: [
    CommonModule,
    MaterialModule,
    LoadingComponent],
  templateUrl: './apartamentos.component.html',
  styleUrl: './apartamentos.component.scss'
})
export class ApartamentosComponent {
  loading: boolean = false
  @ViewChild(MatPaginator) paginator!: MatPaginator

  apartamentos: Apartamentos[] = []
  dataSource = new MatTableDataSource<Apartamentos>(this.apartamentos);
  /**
   *Listado de columnas para la tabla
   *
   * @type {string[]}
   * @memberof ApartamentosComponent
   */
  columnas: string[] = [
    'piso',
    'letra',
    'habitaciones',
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

  filtro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

}
