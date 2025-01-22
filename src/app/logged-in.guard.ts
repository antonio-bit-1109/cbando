import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

// guardia FUNZIONALE -- scritta come funzione
// prende il metodo nel auth service e controlla se i dati sono presenti nel localstorage
// se ci sono la guardia torna true e attiva la rotta altrimenti naviga al login
// la guardia la richiamo nell app-routing
export const loggedInGuard: CanActivateFn = (route, state) => {
  //console.log(route, state);
  // prettier-ignore
  return inject(AuthService).isLogged() ? true : inject(Router).navigateByUrl('/login');
};
