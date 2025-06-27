import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { EstatusPago, Pago } from 'src/app/models/Pagos';
import { PagosService } from 'src/app/services/pagos.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingComponent } from "../loading/loading.component";
import { ModeComponent } from 'src/app/interfaces/Forms';
import { environment } from 'src/app/environment/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  host_storage: string = environment.host_storage
  pagos: Pago[] = [];

  @Input() mode_component: ModeComponent = 'form'
  @ViewChild(MatPaginator) paginator!: MatPaginator

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;

  dataSource = new MatTableDataSource<Pago>(this.pagos);
  loading: boolean = false;
  columnas: string[] = [
    'nombre',
    'apartamento',
    'forma_pago',
    'monto',
    'referencia',
    'url',
    'status',
    'created_at',
  ];
  constructor(
    private toastService: ToastService,
    private pagosService: PagosService,
    private dialog: MatDialog
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

        this.dataSource.data = pagos.filter(p => p.status == 'pendiente' && this.mode_component != 'form');
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }

  /**
   *Valida un pago ya sea para rechazar o aceptar
   *
   * @param {Pago} pago
   * @param {EstatusPago} status
   * @memberof ValidatePagosComponent
   */
  procesoPago(pago: Pago, status: EstatusPago) {
    this.loading = true
    pago.status = status
    this.pagosService.validatePaymentProcess(pago).subscribe({
      next: (pago) => {
        this.dataSource.data = this.dataSource.data.map(p => p.id === pago.id ? pago : p);
        this.toastService.show('Pago procesado correctamente, notificación enviada al receptor');
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }

  viewCapture(capture: Pago) {
    this.dialogRef = this.dialog.open(this.dialogTemplate, { data: capture });
  }
}
