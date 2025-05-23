import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { LoadingComponent } from '../loading/loading.component';
import { ButtonsHeaderComponent } from '../buttons-header/buttons-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gasto } from 'src/app/models/Gastos';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  dialogRef: MatDialogRef<any>;

  loading: boolean = false
  gasto: Gasto = new Gasto()

  constructor(
    public dialog: MatDialog
  ) { }
  
  openModal() {
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }
}
