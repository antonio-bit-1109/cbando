import { Injectable } from '@angular/core';
import { RECIPES } from '../mocks/recipes.mock';
import { Observable, of } from 'rxjs';
import { IPostRecipe, IRecipe } from '../models/recipes.model';
import { HttpClient } from '@angular/common/http';
// nel service vengono fatte le chiamate al backend
// il servizio viene iniattato li dove un componente ne ha bisogno.

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiBaseURL = 'api/recipes';
  constructor(private http: HttpClient) {}

  //metodo che ritorna un observable
  // dal componente posso sottoscrivermi all observable
  getRecipes(): Observable<IRecipe[]> {
    // return of(RECIPES);
    return this.http.get<IRecipe[]>(`${this.apiBaseURL}/`);
  }

  getDetailRicetta(idparam: string): Observable<IRecipe> {
    // const ricetta = RECIPES.find((ricetta) => ricetta._id === idparam);
    // return of(ricetta);
    return this.http.get<IRecipe>(`${this.apiBaseURL}/${idparam}`);
  }

  createRecipe(dataRicetta: IPostRecipe) {
    return this.http.post(`${this.apiBaseURL}/`, dataRicetta);
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${this.apiBaseURL}/${id}`);
  }
}
