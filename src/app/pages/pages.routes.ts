import { Routes } from '@angular/router';

import { ProviderComponent } from '../components-form/provider/provider.component';
import { UsuariosComponent } from '../components-form/usuarios/usuarios.component';
import { ApartamentosComponent } from '../components-form/apartamentos/apartamentos.component';
import { PropietariosInquilinosComponent } from '../components-form/propietarios-inquilinos/propietarios-inquilinos.component';
import { GastosComponent } from '../components-form/gastos/gastos.component';
import { NotificacionesComponent } from '../components-form/notificaciones/notificaciones.component';
import { CoutasComponent } from '../components-form/coutas/coutas.component';
import { StaticsComponent } from '../components-form/statics/statics.component';
import { PagosComponent } from '../components-form/pagos/pagos.component';
import { ValidatePagosComponent } from '../components-form/validate-pagos/validate-pagos.component';

export const PagesRoutes: Routes = [
  { path: 'dashboard', component: StaticsComponent },
  { path: 'proveedores', component: ProviderComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'apartamentos', component: ApartamentosComponent },
  { path: 'propietarios-inquilinos', component: PropietariosInquilinosComponent },
  { path: 'gastos', component: GastosComponent },
  { path: 'notificaciones', component: NotificacionesComponent },
  { path: 'cuotas', component: CoutasComponent },
  { path: 'pagos', component: PagosComponent, data: { tipo: 'general' } },
  { path: 'pagos-personales', component: PagosComponent, data: { tipo: 'personal' } },
  { path: 'validar-pagos', component: ValidatePagosComponent }

];
