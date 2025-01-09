import { Component, numberAttribute, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe } from '../../models/recipes.model';

@Component({
  selector: 'app-recipes',
  standalone: false,

  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent {
  public ricette: IRecipe[] = [];

  //inietto il servizio nel costruttore del componente
  // inserisco il dato ricevuto dal backend
  // e lo salvo in una proprietà della classe , lo stampo in console
  constructor(private RecipeService: RecipeService) {
    this.RecipeService.getRecipes().subscribe({
      next: (response) => {
        this.ricette = response;
        console.log(this.ricette);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // metodi utili
  public troncaDescrizione(descrizione: string, Maxlength: number) {
    if (descrizione.length > Maxlength) {
      return descrizione.substring(0, Maxlength) + '...';
    }

    return descrizione;
  }

  public isAvailable(isAvalaible: boolean) {
    let disponibile = '';

    isAvalaible
      ? (disponibile = 'Disponibile')
      : (disponibile = 'Non disponibile');
    return [disponibile, isAvalaible];
  }
}
