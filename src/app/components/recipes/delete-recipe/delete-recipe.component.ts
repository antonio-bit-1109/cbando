import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-recipe',
  standalone: false,

  templateUrl: './delete-recipe.component.html',
  styleUrl: './delete-recipe.component.scss',
})
export class DeleteRecipeComponent implements OnInit {
  public nomeRicetta: string | undefined;
  public idRicetta: string | undefined;
  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.paramMap.get('_id');
    const title: string = this.activatedRoute.snapshot.paramMap.get('title');
    this.nomeRicetta = title;
    this.idRicetta = id;
    console.log(this.nomeRicetta);
    console.log(this.idRicetta);
  }

  public deleteRicetta() {
    this.recipeService.deleteRecipe(this.idRicetta).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigateByUrl('home');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
