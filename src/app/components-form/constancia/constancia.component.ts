import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from "../loading/loading.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReportesService } from 'src/app/services/reportes.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-constancia',
  imports: [
    ButtonsHeaderComponent,
    MaterialModule,
    FormsModule,
    LoadingComponent
  ],
  templateUrl: './constancia.component.html',
  styleUrl: './constancia.component.scss'
})
export class ConstanciaComponent {
  loading: boolean = false
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;

  constancias: { key: string, nombre: string }[] = [
    { key: 'solvencia', nombre: 'Constancia de solvencia' },
    { key: 'residencia', nombre: 'Constancia de Residencia' }
  ]
  constancia: string = 'solvencia'

  constructor(
    private dialog: MatDialog,
    private toastService: ToastService,
    private reportesService: ReportesService
  ) { }

  openModal() {
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  constanciaSolvencia() {
    this.loading = true
    this.reportesService.constanciaSolvencia().subscribe({
      next: (blob) => {
        this.descargarPdf(blob, 'constancia_solvencia')
        this.toastService.show('Reporte descargado correctamente')
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error)
      }
    })
  }

  constanciaResidencia() {
    this.loading = true
    this.reportesService.constanciaResidencia().subscribe({
      next: (blob) => {
        this.descargarPdf(blob, 'constancia_residencia')
        this.toastService.show('Reporte descargado correctamente')
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.show(err.error)
      }
    })
  }

  generarConstancia() {
    if (this.constancia == 'solvencia') {
      this.constanciaSolvencia()
    } else {
      this.constanciaResidencia()
    }
  }

  descargarPdf(blob: Blob, name_pdf: string) {

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name_pdf + '.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
