import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardStatic } from 'src/app/interfaces/CardStaticPanel';
import { MaterialModule } from 'src/app/material.module';
import { ToastService } from 'src/app/services/toast.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CardStaticComponent } from "../card-static/card-static.component";
import { LoadingComponent } from "../loading/loading.component";
import { PropietariosInquilinosComponent } from "../propietarios-inquilinos/propietarios-inquilinos.component";
import { UsuariosComponent } from "../usuarios/usuarios.component";
import { GastosComponent } from "../gastos/gastos.component";
import { ValidatePagosComponent } from "../validate-pagos/validate-pagos.component";

@Component({
  selector: 'app-statics',
  imports: [
    MaterialModule,
    CommonModule,
    CardStaticComponent,
    LoadingComponent,
    PropietariosInquilinosComponent,
    GastosComponent,
    ValidatePagosComponent
],
  templateUrl: './statics.component.html',
  styleUrl: './statics.component.scss'
})
export class StaticsComponent {

  dateToday: Date = new Date();

  loading: boolean = false
  cards_statics: CardStatic[][] = [
    [
      {
        title: 'Residentes totales',
        contend: '56',
        info: '+12% este mes',
        color: '#f1c40f',
        icon: 'person'
      },
      {
        title: 'Pagos pendientes',
        contend: '38',
        info: '-5% este mes',
        color: '#e74c3c',
        icon: 'warning'
      },
      {
        title: 'Solicitudes activas',
        contend: '10',
        info: '-3% este mes',
        color: '#8e44ad',
        icon: 'bolt'
      }
    ],
    [
      {
        title: 'Fondos USD',
        contend: '400$',
        info: '-5% este mes',
        color: '#27ae60',
        icon: 'attach_money'
      },
      {
        title: 'Fondos Bs',
        contend: '4.000bs',
        info: '+10% este mes',
        color: '#17a589',
        icon: 'attach_money'
      }
    ]
  ]
  constructor(
    private toastService: ToastService,
    private usersService: UsuariosService
  ) { }

  ngOnInit() {
    this.usersService.listUsers().subscribe(res => {

    })
  }
}
