import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { AppSamplePageComponent } from "../../pages/extra/sample-page/sample-page.component";
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProvedoresService } from 'src/app/services/provedores.service';
import { LoadingComponent } from "../loading/loading.component";
import { Proveedor } from 'src/app/models/Provedores';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastService } from 'src/app/services/toast.service';
import { CODIGO_NACIONAL, CODIGO_TELEFONOS, CodigoInternacional } from 'src/app/interfaces/CodigosTelefonos';

@Component({
  selector: 'app-provider',
  imports: [
    ButtonsHeaderComponent,
    MaterialModule,
    CommonModule,
    LoadingComponent,
    FormsModule
  ],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.scss'
})
export class ProviderComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator

  codigos_internacionales: CodigoInternacional[] = CODIGO_TELEFONOS

  dialogRef: MatDialogRef<any>;
  columnas: string[] = ['nombre', 'servicio', 'telefono', 'budget'];
  proveedores: Proveedor[] = [];

  //DATASORUCE DE LA TABLA
  dataSource = new MatTableDataSource<Proveedor>(this.proveedores);
  loading: boolean = false
  provedor: Proveedor = new Proveedor()
  constructor(
    private dialog: MatDialog,
    private provedoresService: ProvedoresService,
    private toastService: ToastService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {

    this.loading = true
    this.provedoresService.listarProveedores().subscribe({
      next: (provedores) => {
        this.dataSource.data = provedores
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      },
    })
  }

  openModal(elemet?: Proveedor) {
    if (elemet) {
      this.provedor = { ...elemet }
    } else {
      this.provedor = new Proveedor()
    }
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  dynamicSupplierCreation() {
    if (this.provedor.id != 0) {
      this.updateProviderService()
    } else {
      this.createProviderService()
    }
  }

  validatePhoneLength(): boolean {
    if (!this.provedor.telefono) return false;
    // Limpiamos el teléfono para que solo tenga números
    const telefonoNumeros = this.provedor.telefono.replace(/\D/g, '');
    // Validar que tenga 11 dígitos (ejemplo para Venezuela)
    return telefonoNumeros.length === 11;
  }
  /**
   *ejecuta el servicio del provedor 
   *
   * @memberof ProviderComponent
   */
  createProviderService() {
    this.loading = true
    this.provedoresService.crearProveedor(this.provedor).subscribe({
      next: (provedor) => {
        this.provedor.id = provedor.id
        this.dataSource.data = [provedor, ...this.dataSource.data];
        this.toastService.show('Proveedor creado correctamente');
        this.dialogRef.close();
        this.loading = false
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }

  /**
   *Ejecuta el servicio para la actualizacion del registro
   *
   * @memberof ProviderComponent
   */
  updateProviderService() {
    this.loading = true
    this.provedoresService.actualizarProveedor(this.provedor).subscribe({
      next: (provedor) => {

        this.dataSource.data = this.dataSource.data.map(p => p.id === this.provedor.id ? this.provedor : p);
        this.toastService.show('Proveedor actualizado correctamente');
        this.dialogRef.close();
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }
  eliminarProvedor(id: number) {
    this.loading = true
    this.provedoresService.eliminarProvedor(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
        this.toastService.show('Proveedor eliminado correctamente');
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error.error);
      }
    })
  }
  filtro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  refrescarProvedor() {
    this.provedor = new Proveedor()
  }
}
