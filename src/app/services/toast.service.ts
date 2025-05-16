import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  show(title: string) {   
    this.snackBar.open(title, 'Cerrar', {
      verticalPosition: 'top'
    });
  }
}
