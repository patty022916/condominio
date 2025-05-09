import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { AppSamplePageComponent } from "../../pages/extra/sample-page/sample-page.component";
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


// table 1
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/product-1.png',
    uname: getRandomName() + ' ' + getRandomLastName(),
    budget: 180,
    priority: 'pago',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/product-2.png',
    uname: getRandomName() + ' ' + getRandomLastName(),
    budget: 90,
    priority: 'deuda',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/product-3.png',
    uname: getRandomName() + ' ' + getRandomLastName(),
    budget: 120,
    priority: 'deuda',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/product-4.png',
    uname: getRandomName() + ' ' + getRandomLastName(),
    budget: 160,
    priority: 'pago',
  },
];

function getRandomName(): string {
  const names = ['Ana', 'Juan', 'Luis', 'María', 'Pedro', 'Sofía', 'Carlos', 'Laura', 'Miguel', 'Sandra'];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomLastName(): string {
  const lastNames = ['García', 'Pérez', 'González', 'Sánchez', 'Martínez', 'Fernández', 'López', 'Rodríguez', 'Díaz', 'Hernández'];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}
@Component({
  selector: 'app-provider',
  imports: [
    ButtonsHeaderComponent,
    MaterialModule,
    CommonModule
  ],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.scss'
})
export class ProviderComponent {
@ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog
  ) { }
  // table 1
  displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource1 = PRODUCT_DATA;


  openModal() {
     this.dialog.open(this.dialogTemplate);
  }
}
