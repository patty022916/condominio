import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { LoadingComponent } from "../loading/loading.component";
import { MaterialModule } from 'src/app/material.module';
import { ToastService } from 'src/app/services/toast.service';
import { Cuota, CuotaDetail } from 'src/app/models/Cuota';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CuotasService } from 'src/app/services/cuotas.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-coutas',
  imports: [
    ButtonsHeaderComponent,
    LoadingComponent,
    MaterialModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './coutas.component.html',
  styleUrl: './coutas.component.scss'
})
export class CoutasComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dialogRef: MatDialogRef<any>;

  columnas: string[] = ['monto', 'fecha', 'created_at', 'budget'];
  loading: boolean = false;
  loadingModal: boolean = false

  cuota: Cuota = new Cuota()
  cuotas: Cuota[] = [];
  dataSource = new MatTableDataSource<Cuota>(this.cuotas);

  constructor(
    private toastService: ToastService,
    private cuotasService: CuotasService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.loading = true
    this.cuotasService.listarCuotas().subscribe({
      next: (cuotas) => {
        this.dataSource.data = cuotas;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toastService.show(err.error.error);
      }
    })
  }
  /**
   * Obtiene los apartamentos según las alícuotas
   *
   * @returns {CuotaDetail[]} 
   * a cuota apartamento.
   */
  get getCuotaApartamentos() {

    return this.cuota.cuotas.filter((cuota) =>
      //seleccionamos las apartamentos con las alicuptas
      cuota.coef_alicuota === 0.40415 || cuota.coef_alicuota === 0.5958
    ).reduce((acc: CuotaDetail[], current: CuotaDetail) => {
      const exists = acc.find((c: CuotaDetail) => c.coef_alicuota === current.coef_alicuota);
      if (!exists) acc.push(current);
      return acc;
    }, []);
  }

  openModal(element?: Cuota) {
    if (element) {
      //se le aumenta un dia a la fecha para que se muestre en el calendario
      this.cuota.fecha = new Date(Date.parse(element.fecha.toString()));
      this.cuota.id = element.id
      // this.cuota.fecha.setDate(this.cuota.fecha.getDate() + 1);
    } else {
      this.cuota = new Cuota()
    }


    this.generarCuota(this.cuota.fecha as Date)
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  generarCuota(fecha_cuota: MatDatepickerInputEvent<Date> | Date) {

    this.loadingModal = true
    let fecha: Date = fecha_cuota as Date
    if (fecha_cuota.hasOwnProperty('value')) fecha = (fecha_cuota as MatDatepickerInputEvent<Date>).value as Date

    //?ojo cn las fechas se le aumenta un dia
    fecha.setDate(fecha.getDate() + 1);
    let fecha_formate: string = fecha.toISOString().split('T')[0];

    this.cuotasService.generarCuotaPorFecha(fecha_formate).subscribe({
      next: (cuota) => {
        // ya que el servicio on retorna el id  lo guardamos por la referencia de la tabla 
        this.cuota = { ...cuota, id: this.cuota.id }

        this.loadingModal = false
      }, error: (err) => {
        this.loadingModal = false;
        this.toastService.show(err.error.error);
      }
    })
  }
  guardarCuota() {
    this.loading = true

    let fecha_formate: string = this.cuota.fecha.toString();
    this.cuotasService.guardarCuota(fecha_formate).subscribe({
      next: (cuota) => {

        this.dataSource.data = [cuota, ...this.dataSource.data];
        this.loading = false
        this.dialogRef.close();
        this.toastService.show('Cuota guardada con éxito')
      }, error: (err) => {
        this.loading = false;
        this.toastService.show(err.error.error);
      }
    })
  }
  filtro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminarCuota(id: number) {

    this.loading = true
    this.cuotasService.eliminarCuota(id).subscribe({
      next: (cuota) => {
        this.dataSource.data = this.dataSource.data.filter(g => g.id !== id);
        this.toastService.show('Cuota eliminada con exito')
        this.loading = false
      }, error: (err) => {
        this.loading = false;
        this.toastService.show(err.error.error);
      }
    })
  }
}
