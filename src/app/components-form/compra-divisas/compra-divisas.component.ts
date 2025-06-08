import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { LoadingComponent } from "../loading/loading.component";
import { Compra, Movimiento, Pago, ServicioIngreso } from 'src/app/models/Pagos';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cuota } from 'src/app/models/Cuota';
import { ToastService } from 'src/app/services/toast.service';
import { COMPRAS_LIST } from 'src/app/services/data_list';

@Component({
  selector: 'app-compra-divisas',
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ButtonsHeaderComponent,
    LoadingComponent
  ],
  templateUrl: './compra-divisas.component.html',
  styleUrl: './compra-divisas.component.scss'
})
export class CompraDivisasComponent {

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dialogRef: MatDialogRef<any>;

  loading: boolean = false
  compra: Compra = new Compra();
  compras: Compra[] = []
  dataSource = new MatTableDataSource<Compra>(this.compras);

  servicios: { key: ServicioIngreso, nombre: string }[] = [
    { key: 'antena', nombre: 'Antena' },
    { key: 'internet', nombre: 'Internet' },
    { key: 'divisas', nombre: 'Divisas' }
  ]

  movimientos: { key: Movimiento, nombre: string }[] = [
    { key: 'egreso', nombre: 'Egreso' },
    { key: 'ingreso', nombre: 'Ingreso' }
  ]
  monedas: { key: string, nombre: string }[] = [
    { key: 'usd', nombre: 'USD' },
    { key: 'bs', nombre: 'Bs' }
  ]

  columnas: string[] = [
    'servicio',
    'movimiento',
    'monto',
    'fecha_compra',
    'budget'
  ]

  constructor(
    private toastService: ToastService,
    private dialog: MatDialog
  ) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource.data = COMPRAS_LIST
  }

  openModal(element?: Compra) {
    if (element) {
      this.compra = { ...element }
    } else {
      this.compra = new Compra()
    }
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  refrescarCompra() {
    this.compra = new Compra();
  }

  guardar() {
    this.toastService.show('Compra guardada con éxito');
    this.dialogRef.close();
  }

  eliminar(id: number) {
    this.toastService.show('Compra eliminada con éxito');
  }
}
