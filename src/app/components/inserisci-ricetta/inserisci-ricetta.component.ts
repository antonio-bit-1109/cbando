import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { IPostRecipe } from '../../models/recipes.model';
@Component({
  selector: 'app-inserisci-ricetta',
  standalone: false,

  templateUrl: './inserisci-ricetta.component.html',
  styleUrl: './inserisci-ricetta.component.scss',
})
export class InserisciRicettaComponent {
  public form = new FormGroup({
    titolo: new FormControl('', [Validators.required]),
    descrizione: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    disponibile: new FormControl(null, [Validators.required]),
    difficolta: new FormControl('', [Validators.required]),
  });

  constructor(private recipeService: RecipeService) {}

  public onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      const ricetta: IPostRecipe = {
        title: this.form.controls.titolo.value,
        description: this.form.controls.descrizione.value,
        image: this.form.controls.url.value,
        difficulty: Number(this.form.controls.difficolta.value),
        published: this.form.controls.disponibile.value,
      };

      this.recipeService.createRecipe(ricetta).subscribe({
        next: (resp) => {
          console.log('tutto bene , risposta server positiva.' + resp);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  public getFormValidation() {
    return this.form.valid;
  }
}
