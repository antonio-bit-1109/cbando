import { Injectable } from '@angular/core';
import { RECIPES } from '../mocks/recipes.mock';
import { Observable , of } from 'rxjs';
import { IRecipe } from '../models/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  //metodo che ritorna un observable 
  // dal componente posso sottoscrivermi all observable 
  getRecipes() : Observable<IRecipe[]> {
    return of(RECIPES)
  }
}
