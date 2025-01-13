import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe } from '../../models/recipes.model';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public ricette: IRecipe[] = [];

  constructor(private RecipeService: RecipeService) {
    this.RecipeService.getRecipes().subscribe({
      next: (response) => {
        this.ricette = this.SortRicetteFromLast_takeOnly4(response);
        console.log(this.ricette);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private SortRicetteFromLast_takeOnly4(recipes: IRecipe[]) {
    return recipes.sort((a, b) => b._id - a._id).slice(0, 4);
  }
}
