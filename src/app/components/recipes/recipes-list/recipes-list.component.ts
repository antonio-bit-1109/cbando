import { Component } from '@angular/core';
import { IRecipe } from '../../../models/recipes.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  standalone: false,

  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent {
  public ricette: IRecipe[] = [];
  public titoloRicevuto: string = '';
  //inietto il servizio nel costruttore del componente
  // inserisco il dato ricevuto dal backend
  // e lo salvo in una proprietà della classe , lo stampo in console
  constructor(private RecipeService: RecipeService) {
    this.RecipeService.getRecipes().subscribe({
      next: (response) => {
        this.ricette = response.sort((a, b) => a._id - b._id);
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
}
