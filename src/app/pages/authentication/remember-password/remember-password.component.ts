import { Component } from '@angular/core';
import { LoadingComponent } from "../../../components-form/loading/loading.component";
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-remember-password',
  imports: [
    LoadingComponent,
    MaterialModule,
    CommonModule,
    FormsModule

  ],
  templateUrl: './remember-password.component.html',
  styleUrl: './remember-password.component.scss'
})
export class RememberPasswordComponent {
  loading: boolean = false

  correo: string

  constructor(
    private toastService: ToastService
  ) { }

  submit(){
    this.toastService.show('El codigo ha sido enviado al correo exitosamente');
  }
}
