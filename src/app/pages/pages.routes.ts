import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ProviderComponent } from '../components-form/provider/provider.component';
import { UsuariosComponent } from '../components-form/usuarios/usuarios.component';

export const PagesRoutes: Routes = [
  { path: 'dashboard', component: StarterComponent },
  { path: 'proveedores', component: ProviderComponent },
  { path: 'usuarios', component: UsuariosComponent }
];
