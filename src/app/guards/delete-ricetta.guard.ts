import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const deleteRicettaGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isLogged() && authService.isAdmin()) {
    return true;
  }

  const router = inject(Router);
  router.navigateByUrl('home');
  return false;
};
