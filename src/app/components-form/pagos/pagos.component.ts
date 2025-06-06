import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../layouts/full/header/header.component";
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { LoadingComponent } from "../loading/loading.component";
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormaPago, Pago } from 'src/app/models/Pagos';
import { CuotasService } from 'src/app/services/cuotas.service';
import { Cuota } from 'src/app/models/Cuota';
import { ToastService } from 'src/app/services/toast.service';
import { Usuario } from 'src/app/models/Usuarios';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-pagos',
  imports: [
    ButtonsHeaderComponent,
    LoadingComponent,
    MaterialModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss'
})
export class PagosComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  loading: boolean = false;
  mode_component: 'general' | 'personal' = 'general';


  pago: Pago = new Pago()
  usuarios: Usuario = new Usuario()
  pagos: Pago[] = []

  dataSource = new MatTableDataSource<Pago>(this.pagos);
  dialogRef: MatDialogRef<any>;

  forma_pago: { key: FormaPago, nombre: string }[] = [
    { key: 'completo', nombre: 'Completo' },
    { key: 'parcial', nombre: 'Parcial' }
  ]

  cuota: Cuota = new Cuota()

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
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cuotasService: CuotasService,
    private toastService: ToastService,
    private pagosService: PagosService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    //capturamos de donde se esta llamando al componente
    this.mode_component = this.route.snapshot.data['tipo'];
    this.usuarios = JSON.parse(sessionStorage.getItem('user') as string);

    if (this.mode_component == 'personal')
      this.generarCuotaPorUsuario(this.usuarios.id)

    this.listarPagos()
  }

  listarPagos() {
    this.loading = true
    this.pagosService.listPayments().subscribe({
      next: (pagos) => {
        this.dataSource.data = pagos
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }
  /**
   * Genera una cuota por usuario según el apartamento 
   *
   * @param {number} id_user
   * @memberof PagosComponent
   */
  generarCuotaPorUsuario(id_user: number) {
    this.loading = true
    this.cuotasService.generarCuotaPorUsuario(id_user).subscribe({
      next: (cuota) => {

        //? evalúa  solo el primer indice del arreglo
        let { total_bs } = cuota.cuotas[0]
        this.cuota = cuota
        this.pago.monto = total_bs
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }

  openModal(elemet?: any) {
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  refrescarPago() {
    this.pago = new Pago()
    this.pago.monto = this.pago.forma_pago == 'completo' ? this.cuota.cuotas[0].total_bs : this.pago.monto
  }

  /**
   *Valida que el pago ea completo y que lo asigne al monto total del pago prevee mandar un pago completo con un monto
   *diferente
   *
   * @param {MatSelectChange} event
   * @memberof PagosComponent
   */
  validarPagoCompleto(event: MatSelectChange) {
    this.pago.monto = event.value == 'completo' ? this.cuota.cuotas[0].total_bs : this.pago.monto

  }

  guardar() {
    this.loading = true
    this.pagosService.createPaymentByCondominium(this.pago).subscribe({
      next: (pago) => {
        this.dataSource.data = [pago, ...this.dataSource.data];
        this.loading = false
        this.toastService.show('Pago registrado exitosamente')
        this.dialogRef.close()

      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }
}
