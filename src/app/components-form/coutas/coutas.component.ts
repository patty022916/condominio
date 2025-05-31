import { Component } from '@angular/core';
import { ButtonsHeaderComponent } from "../buttons-header/buttons-header.component";
import { LoadingComponent } from "../loading/loading.component";
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-coutas',
  imports: [
    ButtonsHeaderComponent,
    LoadingComponent,
    MaterialModule
  ],
  templateUrl: './coutas.component.html',
  styleUrl: './coutas.component.scss'
})
export class CoutasComponent {
  loading = false;

  openModal() {
    console.log('openModal');
  }
}
