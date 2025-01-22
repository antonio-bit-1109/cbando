import { Component, inject } from '@angular/core';
import { IRecipe } from '../../../models/recipes.model';
import { RecipeService } from '../../../services/recipe.service';
import { filter, map, take, first, Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Iuser } from '../../../models/user.model';

@Component({
  selector: 'app-recipes-list',
  standalone: false,

  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent {
  public recipeService = inject(RecipeService);
  public authService = inject(AuthService);
  public ricette: IRecipe[] = [];
  public titoloRicevuto: string = '';

  first: number = 0;

  rows: number = 10;
  page = 1;
  size = 4;
  public visible = false;

  public totaleRicette: IRecipe[];

  //inietto il servizio nel costruttore del componente
  // inserisco il dato ricevuto dal backend
  // e lo salvo in una proprietà della classe , lo stampo in console
  constructor() {
    this.getRecipeMethod();
  }

  // il dollaro è convenzione per chiarire che sto facendo una chiamata asincrona
  // public recipes$: Observable<IRecipe[]> = this.recipeService.getRecipes().pipe(
  //   map((res) => res.filter((ricette) => ricette.difficulty < 3)),
  //   map((res) => (this.totaleRicette = res))
  // );

  public getRecipeMethod() {
    this.recipeService
      .getRecipes()
      .pipe(
        take(1)
        //first()  prendi solo la prima chiamata e poi chiude la subscribe
        // map((res) => res[0].title) //taglio solo gli elementi che mi servono in entrata nel componente
        // filter()
      )
      .subscribe({
        next: (response) => {
          this.ricette = response.sort((a, b) => a._id - b._id);
          this.ricette = response;
          console.log(this.ricette);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  // metodo nel padre per ricevere un evento/output emesso dal figlio
  riceviEvento(event: any) {
    this.titoloRicevuto = event;
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    console.log('Rows per page:', this.size);
  }

  public showModal() {
    this.visible = true;
  }

  public handleHideModal(event: any) {
    this.visible = event;
  }

  public isLoggedAndAdmin() {
    if (this.authService.isLogged()) {
      const storage: Iuser = this.authService.getStorage();
      return storage?.role === 'admin';
    }

    return false;
  }
}
