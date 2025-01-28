import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IRecipe } from '../../../models/recipes.model';
import { RecipeService } from '../../../services/recipe.service';
import { filter, map, take, first, Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Iuser } from '../../../models/user.model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  standalone: false,

  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
  providers: [MessageService],
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
  public esitoPostRicetta: [boolean, string] | null = null;

  //inietto il servizio nel costruttore del componente
  // inserisco il dato ricevuto dal backend
  // e lo salvo in una proprietà della classe , lo stampo in console
  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
    const page = this.activatedRoute.snapshot.paramMap.get('page');

    if (page && parseInt(page)) {
      this.page = parseInt(page);
    }

    this.getRecipeMethod();
  }

  // il dollaro è convenzione per chiarire che sto facendo una chiamata asincrona
  // public recipes$: Observable<IRecipe[]> = this.recipeService.getRecipes().pipe(
  //   map((res) => res.filter((ricette) => ricette.difficulty < 3)),
  //   map((res) => (this.totaleRicette = res))
  // );

  // richiamato ogni volta che nel componente cambia qualcosa
  // in questo caso controllo che arrivi il valore dell esito della post della ricetta
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['esitoPostRicetta'] && this.esitoPostRicetta !== null) {
  //     if (this.esitoPostRicetta[1] === 'succ') {
  //       this.show(
  //         'success',
  //         'Ricetta creata con successo',
  //         'Operazione eseguita'
  //       );
  //     } else if (this.esitoPostRicetta[1] === 'err') {
  //       this.show(
  //         'error',
  //         'Errore durante la creazione della ricetta',
  //         'Operazione fallita'
  //       );
  //     }
  //     this.esitoPostRicetta = null; // Resetta la variabile
  //   }
  // }

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

  // prendo l'esito ricetta in arrivo dal figlio e utilizzo la risposta al suo interno per renderizzare il toast con l'esito della post
  // infine rifaccio la getAll di tutti i prodotti per aggiornare il componente.
  public getEsitoPostRicetta(event) {
    this.esitoPostRicetta = event;

    if (Array.isArray(this.esitoPostRicetta)) {
      if (this.esitoPostRicetta[1] === 'succ') {
        this.show(
          'success',
          'Ricetta creata con successo',
          'Operazione eseguita'
        );
      } else {
        this.show(
          'error',
          'Errore durante la creazione della ricetta',
          'Operazione fallita'
        );
      }

      this.getRecipeMethod();
    }
  }

  show(severity: string, content: string, summary: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: content,
      key: 'msgPostRicetta',
    });
  }
}
