import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ProviderComponent } from '../components-form/provider/provider.component';
import { UsuariosComponent } from '../components-form/usuarios/usuarios.component';
import { ApartamentosComponent } from '../components-form/apartamentos/apartamentos.component';
import { PropietariosInquilinosComponent } from '../components-form/propietarios-inquilinos/propietarios-inquilinos.component';
import { GastosComponent } from '../components-form/gastos/gastos.component';

export const PagesRoutes: Routes = [
  { path: 'dashboard', component: StarterComponent },
  { path: 'proveedores', component: ProviderComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'apartamentos', component: ApartamentosComponent },
  { path: 'propietarios-inquilinos', component: PropietariosInquilinosComponent },
  { path: 'gastos', component: GastosComponent }
];
