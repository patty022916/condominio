import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { EstatusPago, Pago } from 'src/app/models/Pagos';
import { PagosService } from 'src/app/services/pagos.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingComponent } from "../loading/loading.component";
import { ModeComponent } from 'src/app/interfaces/Forms';

@Component({
  selector: 'app-validate-pagos',
  imports: [
    CommonModule,
    MaterialModule,
    LoadingComponent
  ],
  templateUrl: './validate-pagos.component.html',
  styleUrl: './validate-pagos.component.scss'
})
export class ValidatePagosComponent {

  @Input() mode_component: ModeComponent = 'form'
  pagos: Pago[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource = new MatTableDataSource<Pago>(this.pagos);
  loading: boolean = false;
  columnas: string[] = [
    'nombre_usuario',
    'apartamento',
    'monto',
    'url',
    'status',
    'forma_pago',
    'fecha_pago'
  ];
  constructor(
    private toastService: ToastService,
    private pagosService: PagosService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    if (this.mode_component == undefined) this.mode_component = 'form';
    if (this.mode_component == 'form') this.columnas.push('budget')
    this.listarPagos()
  }
  listarPagos() {
    this.loading = true
    this.pagosService.listPayments().subscribe({
      next: (pagos) => {
        this.dataSource.data = pagos.filter(p => p.status == 'pendiente')
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }

  procesoPago(pago: Pago, status: EstatusPago) {
    pago.status = status
  }
}
