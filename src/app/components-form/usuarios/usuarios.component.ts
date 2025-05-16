import { Component, TemplateRef, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../layouts/full/header/header.component";
import { MaterialModule } from 'src/app/material.module';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Usuario } from 'src/app/models/Usuarios';

@Component({
  selector: 'app-usuarios',
  imports: [
    MaterialModule,
    ButtonsHeaderComponent,
    CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;
  columnas: string[] = ['id', 'nombre', 'correo', 'telefono', 'cargo', 'budget'];
  state: any[] = [
    { value: 'steak-0', viewValue: 'Cuba' },
    { value: 'pizza-1', viewValue: 'Djibouti' },
    { value: 'tacos-2', viewValue: 'Bulgaria' },
    { value: 'tacos-3', viewValue: 'Cabo Verde' },
  ];

  usuarios: Usuario[] = [
    new Usuario(),
    new Usuario(),
    new Usuario(),
  ]
  selectedState = this.state[3].value;

  constructor(
    public dialog: MatDialog
  ) { }

  openModal() {
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }
}
