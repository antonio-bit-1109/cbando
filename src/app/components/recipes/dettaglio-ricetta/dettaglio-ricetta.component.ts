import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { IRecipe } from '../../../models/recipes.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dettaglio-ricetta',
  standalone: false,

  templateUrl: './dettaglio-ricetta.component.html',
  styleUrl: './dettaglio-ricetta.component.scss',
})
export class DettaglioRicettaComponent implements OnInit {
  // invece che iniettare nel costruttore, utilizzo il metodo Inject di angular Core.
  private RecipeService = inject(RecipeService);
  private activatedRoute = inject(ActivatedRoute);
  private Router = inject(Router);

  ricetta: IRecipe | undefined;
  private defaultURLImage =
    'https://media.istockphoto.com/id/1396814518/it/vettoriale/immagine-in-arrivo-nessuna-foto-nessuna-immagine-in-miniatura-disponibile-illustrazione.jpg?s=2048x2048&w=is&k=20&c=JrtawqzdBNu2u9zZvkP10KLBozTxsaXPl0BxjuaUtMY=';

  private percorso = 'assets/images/difficolta-';

  constructor() {}

  ngOnInit(): void {
    this.onGetDetail();
  }

  // metodo che prende l'id inserito nel parametro
  public onGetDetail() {
    const id = this.activatedRoute.snapshot.paramMap.get('_id');

    if (id) {
      this.RecipeService.getDetailRicetta(id).subscribe({
        next: (res) => {
          this.ricetta = res;
          console.log('ricetta ottenuta');
          console.log(this.ricetta);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  // metodo BONUS per prendere parametri multipli
  //
  public onGetDetail2() {
    this.activatedRoute.params.subscribe((urlParams) => {
      const id = urlParams['_id'];

      if (id) {
        this.RecipeService.getDetailRicetta(id).subscribe(
          (res) => (this.ricetta = res)
        );
      }
    });
  }

  // metodi generici

  public giveDefaultImageIfNotPresent(imageURL: string) {
    if (!imageURL.startsWith('https://www') && imageURL === '') {
      return this.defaultURLImage;
    }
    return imageURL;
  }

  public getDifficolta(ricetta: IRecipe) {
    return this.percorso + ricetta.difficulty.toString() + '.png';
  }

  public getDescription(ricetta: IRecipe) {
    return ricetta.description;
  }
}
