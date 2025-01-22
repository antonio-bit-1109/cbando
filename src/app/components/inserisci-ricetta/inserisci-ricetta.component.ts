import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { IPostRecipe } from '../../models/recipes.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-inserisci-ricetta',
  standalone: false,

  templateUrl: './inserisci-ricetta.component.html',
  styleUrl: './inserisci-ricetta.component.scss',
  providers: [MessageService],
})
export class InserisciRicettaComponent {
  public form = new FormGroup({
    titolo: new FormControl('', [Validators.required]),
    descrizione: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    disponibile: new FormControl(false),
    difficolta: new FormControl('', [Validators.required]),
  });

  constructor(private recipeService: RecipeService) {}

  @Output() IsFormVisible = new EventEmitter();
  @Output() RespReceived = new EventEmitter();
  // private TimeOutId;

  public onSubmit() {
    // console.log(this.form.value);
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
          this.IsFormVisible.emit(false);
          //emetto un array per specificare l'esito della post [boolean, string], da ritornare fino al padre recipes-list e mostare un toast di successo o errore a seconda di cosa è successo in questo punto.
          this.RespReceived.emit([true, 'succ']);
        },
        error: (err) => {
          console.error(err);
          // ** in caso di errore nella post della ricetta emetto questo altro array
          this.RespReceived.emit([true, 'err']);
        },
      });
    }
  }

  public getFormValidation() {
    return this.form.valid;
  }
}
