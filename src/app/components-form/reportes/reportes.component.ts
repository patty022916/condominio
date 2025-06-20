import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardStatic } from 'src/app/interfaces/CardStaticPanel';
import { MaterialModule } from 'src/app/material.module';
import { CardStaticComponent } from "../card-static/card-static.component";
import { ReportConfiguration } from 'src/app/interfaces/Reports';
import { ReportesService } from 'src/app/services/reportes.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-reportes',
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    CardStaticComponent,
    LoadingComponent
  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  loading: boolean = false
  formatos: any[] = [
    {
      key: 'pdf',
      nombre: 'PDF'
    }
  ]
  cards_reports: CardStatic[][] = [
    [
      {
        id: 1,
        title: 'Nomina de proveedores',
        contend: 'Reporte de la nomina de todos los proveedores del sistema ',
        info: '',
        color: '#16a085',
        icon: 'person'
      },
    ],
    [
      {
        id: 2,
        title: 'Gastos por mes',
        contend: 'Reporte de todos los tipos de gastos por mes',
        info: '',
        color: '#8e44ad',
        icon: 'attach_money'
      }
    ],
    [
      {
        id: 3,
        title: 'Apartamentos',
        contend: 'Reporte de todos los apartamentos del sistema',
        info: '',
        color: '#34495e',
        icon: 'apartment'
      }
    ]
  ]
  cardStatic: CardStatic = this.cards_reports[0][0]
  configuration: ReportConfiguration = {
    type_formate: 'pdf',
    report_id: 1,
    date_start: new Date(),
    date_end: new Date()
  }

  constructor(
    private reportesService: ReportesService,
    private toastService: ToastService
  ) { }

  selectCard(card: CardStatic) {
    this.cardStatic = card
  }

  generarReporte() {
    let reportes: { [key: string]: () => void } = {
      '1': this.reporteNominaProveedores.bind(this),
      '2': this.gastos.bind(this),
      '3': this.reporteApartamentos.bind(this)
    };

    reportes[(this.cardStatic.id as number).toString()]();
  }

  /**
   *Reporte de apartamentos
   *
   * @memberof ReportesComponent
   */
  reporteApartamentos() {
    this.loading = true
    this.reportesService.reporteApartamentos().subscribe({
      next: (blob) => {
        this.descargarPdf(blob, 'reporte_apartamentos')
        this.toastService.show('Reporte descargado correctamente')
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error)
      }
    })
  }

  gastos() {
    this.loading = true
    this.reportesService.gastos(this.configuration).subscribe({
      next: (blob) => {
        this.descargarPdf(blob, 'reporte_gastos')
        this.toastService.show('Reporte descargado correctamente')
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error)
      }
    })
  }

  /**
   *Reporte de nomina de proveedores
   *
   * @memberof ReportesComponent
   */
  reporteNominaProveedores() {
    this.loading = true
    this.reportesService.nominaProveedores().subscribe({
      next: (blob) => {
        this.descargarPdf(blob, 'reporte_nomina')
        this.toastService.show('Reporte descargado correctamente')
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error)
      }
    })
  }

  /**
   *Ejecuta la descarga del reporte 
   *
   * @param {Blob} blob
   * @param {string} name_pdf
   * @memberof ReportesComponent
   */
  descargarPdf(blob: Blob, name_pdf: string) {

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name_pdf + '.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
