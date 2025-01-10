import { Injectable } from '@angular/core';
import { RECIPES } from '../mocks/recipes.mock';
import { Observable, of } from 'rxjs';
import { IRecipe } from '../models/recipes.model';

// nel service vengono fatte le chiamate al backend
// il servizio viene iniattato li dove un componente ne ha bisogno.

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  //metodo che ritorna un observable
  // dal componente posso sottoscrivermi all observable
  getRecipes(): Observable<IRecipe[]> {
    return of(RECIPES);
  }

  getDetailRicetta(idparam: number): Observable<IRecipe> {
    const ricetta = RECIPES.find((ricetta) => ricetta._id === idparam);
    return of(ricetta);
  }
}
