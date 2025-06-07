import { Component } from '@angular/core';
import { ValidatePagosComponent } from "../validate-pagos/validate-pagos.component";

@Component({
  selector: 'app-pagos-atrasados',
  imports: [ValidatePagosComponent],
  templateUrl: './pagos-atrasados.component.html',
  styleUrl: './pagos-atrasados.component.scss'
})
export class PagosAtrasadosComponent {

}
