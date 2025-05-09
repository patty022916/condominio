import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ProviderComponent } from '../components-form/provider/provider.component';

export const PagesRoutes: Routes = [
  { path: 'dashboard', component: StarterComponent },
  { path:'proveedores',component:ProviderComponent}
];
