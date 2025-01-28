import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const modificaRicettaGuard: CanActivateFn = (route, state) => {
  // return true;
  const authService = inject(AuthService);
  const router = inject(Router);

  // puoi fare redirect alla pagina della modifica  se sei loggato e admin
  if (authService.isLogged() && authService.isAdmin()) {
    return true;
  }

  // altrimenti il redirect è alla home
  router.navigateByUrl('home');
  return false;
};
