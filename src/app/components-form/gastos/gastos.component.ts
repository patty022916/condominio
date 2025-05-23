import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { LoadingComponent } from '../loading/loading.component';
import { ButtonsHeaderComponent } from '../buttons-header/buttons-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gasto, TypeGasto } from 'src/app/models/Gastos';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProvedoresService } from 'src/app/services/provedores.service';
import { ToastService } from 'src/app/services/toast.service';
import { Proveedor } from 'src/app/models/Provedores';
import { GastosService } from 'src/app/services/gastos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-gastos',
  imports: [
    MaterialModule,
    LoadingComponent,
    ButtonsHeaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.scss'
})
export class GastosComponent {

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dialogRef: MatDialogRef<any>;

  loading: boolean = false
  gasto: Gasto = new Gasto()
  gastos: Gasto[] = []

  dataSource = new MatTableDataSource<Gasto>(this.gastos);
  columnas: string[] = [
    'descripcion',
    'monto',
    'fecha',
    'tipo_gasto',
    'proveedor',
    'budget'
  ];
  tipos_gastos: { id: TypeGasto, name: string }[] = [
    { id: 'fijo', name: 'Fijo' },
    { id: 'comun', name: 'Comun' },
    { id: 'extraordinario', name: 'Extraordinario' }
  ]
  proveedores: Proveedor[] = []

  constructor(
    public dialog: MatDialog,
    public toastService: ToastService,
    private gastosService: GastosService,
    private provedoresService: ProvedoresService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.obtenerProveedores()
    this.obtenerGastos()
  }


  obtenerProveedores() {
    this.loading = true
    this.provedoresService.listarProveedores().subscribe({
      next: (proveedores) => {
        this.proveedores = proveedores
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error)
      }
    })
  }

  obtenerGastos() {
    this.loading = true
    this.gastosService.listarGastos().subscribe({
      next: (gastos) => {
        gastos.map(gasto => gasto.fecha = new Date(gasto.fecha))
        this.dataSource.data = gastos;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toastService.show(err.error.error);
      }
    })
  }

  validarRecurrencia() {
    this.gasto.recurrente = !(this.gasto.tipo_gasto == 'extraordinario')
  }

  openModal(element?: Gasto) {
    if (element) {
      this.gasto = Object.assign({}, element)
    } else {
      this.gasto = new Gasto()

    }

    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  crearGasto() {
    if (this.gasto.id != 0) {
      this.actualizarGastoService()
    } else {
      this.crearGastoService()
    }
  }

  actualizarGastoService() {
    this.loading = true
    this.gastosService.actualizarGasto(this.gasto).subscribe({
      next: (gasto) => {
        this.dataSource.data = this.dataSource.data.map(g => g.id === gasto.id ? gasto : g);
        this.toastService.show('Gasto actualizado correctamente')
        this.loading = false
        this.dialogRef.close();
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error)
      }
    })
  }

  crearGastoService() {
    this.loading = true
    this.gastosService.crearGasto(this.gasto).subscribe({
      next: (gasto) => {
        this.gasto.id = gasto.id
        this.dataSource.data = [gasto, ...this.dataSource.data];

        this.dialogRef.close();
        this.loading = false
        this.toastService.show('Gasto creado correctamente')

      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error)
      }
    })
  }

  filtro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  /**
   *Setea un provedor a gasto
   *
   * @param {*} event
   * @memberof GastosComponent
   */
  seleccionarProvedor(event: MatSelectChange) {
    this.gasto.proveedor = this.proveedores.find(p => p.id == event.value)?.nombre ?? '';
    
  }

  refrescarGasto() {
    this.gasto = new Gasto()
  }

  eliminarGasto(id: number) {
    this.loading = true
    this.gastosService.eliminarGasto(id).subscribe({

      next: () => {
        this.dataSource.data = this.dataSource.data.filter(g => g.id !== id);
        this.toastService.show('Gasto eliminado correctamente')
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error)
      }
    })
  }
}
