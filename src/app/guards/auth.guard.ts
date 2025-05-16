import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // inyección de dependencias
  const sessionValue = sessionStorage.getItem('user');
  const isLogged = sessionStorage.getItem('is_logged') === 'true';

  if (sessionValue && isLogged) {
    return true; // permite el acceso
  }

  // redirige al login si no hay sesión
  router.navigate(['/login']);
  return false;
};
