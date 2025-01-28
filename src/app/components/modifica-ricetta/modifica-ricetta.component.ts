import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IPostRecipe,
  IRecipe,
  Resp_edit_recipe_put,
} from '../../models/recipes.model';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modifica-ricetta',
  standalone: false,

  templateUrl: './modifica-ricetta.component.html',
  styleUrl: './modifica-ricetta.component.scss',
  providers: [MessageService],
})
export class ModificaRicettaComponent implements OnInit {
  public title = 'Modifica Ricetta';
  public form = new FormGroup({
    title: new FormControl('', []),
    description: new FormControl('', []),
    image: new FormControl('', []),
    published: new FormControl(null, []),
    difficulty: new FormControl(null, []),
  });

  public prodotto: undefined | IRecipe;
  public id_prodotto: string | undefined;
  public paginaRicetta: string | undefined;
  keyToast = 'toastEsitoput';
  // al montaggio del componente ottengo l'id passato nella rotta
  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    const idProdotto = this.activatedRoute.snapshot.paramMap.get('_id');

    this.paginaRicetta = this.activatedRoute.snapshot.paramMap.get('page');

    this.id_prodotto = idProdotto;
    this.recipeService.getDetailRicetta(idProdotto).subscribe({
      next: (ricetta) => {
        this.populateFormWithData(ricetta);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {}

  public onSubmit() {
    console.log(this.form.value);

    const ricettaPut: IPostRecipe = {
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      difficulty: this.form.controls.difficulty.value,
      image: this.form.controls.image.value,
      published: this.form.controls.published.value,
    };

    this.recipeService
      .putModificheRicetta(ricettaPut, this.id_prodotto)
      .subscribe({
        next: (resp: Resp_edit_recipe_put) => {
          this.show(
            'success',
            'modifica prodotto',
            ` prodotto ${resp.title} modificato con successo.`
          );
          setTimeout(() => {
            this.router.navigateByUrl(`/ricette/${this.paginaRicetta}`);
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          this.show(
            'error',
            'modifica prodotto',
            `errore imprevisto durante la modifica del prodotto. Contattata quello sviluppatore cane che te l'ha fatto.`
          );
        },
      });
  }

  public populateFormWithData(ricetta: IRecipe) {
    this.form.patchValue({
      title: ricetta.title,
      description: ricetta.description,
      image: ricetta.image,
      published: ricetta.published,
      difficulty: ricetta.difficulty,
    });
  }

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 2000,
      key: this.keyToast,
    });
  }
}
