import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewChecked,
  signal,
} from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { IUserDetail } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { IRecipe } from '../../models/recipes.model';
import { ToastService } from '../../services/toast.service';
import { ChangeDetectorRef } from '@angular/core';
// import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-preferiti',
  standalone: false,

  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss',
})
export class PreferitiComponent implements OnInit {
  public arrayPreferiti: string[] | undefined;
  public ricette: IRecipe[] | undefined;
  public hideProgressBar = false;
  public email = null;

  @ViewChild('progressBar') progressBar: ElementRef | undefined;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private recipeService: RecipeService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.email = this.getUserEmail();
    this.getArrayPreferiti(this.email);
  }

  private getUserEmail() {
    return this.authService.getUserEmail();
  }

  private getArrayPreferiti(email: string) {
    return this.userService.GetDetailUser(email).subscribe({
      next: (userdata: IUserDetail) => {
        this.arrayPreferiti = userdata.preferite;
        //simulo un ritardo per mostrare il loader nel template
        // setTimeout(() => {
        this.getDetailRicetteForkJoin();
        this.hideProgressBar = true;
        // }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('errore durante get dell array preferiti dell utente.');
      },
    });
  }

  getDetailRicetteForkJoin() {
    const observableArray = this.arrayPreferiti.map((id) =>
      this.recipeService.getDetailRicetta(id)
    );
    forkJoin(observableArray).subscribe({
      next: (ricette: IRecipe[]) => {
        this.ricette = ricette;
        // dopo che ricette è stato popolato creo un array di booleani basato sulla lunghezza di ricette
        // this.clicked = new Array(this.ricette.length).fill(false);
        // console.log(this.clicked);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('errore durante la get di tutti i dettagli ricetta.');
      },
    });
  }

  // la funzione tracjby utilizzata per rirenderizzare la lista qualora questa dovesse essere aggiornata prende in automatico indice corrente ed elemento che si sta ciclando. basta passare i parametri in questo modo e nel template scrivere solo :
  // *ngFor="let ricetta of ricette; trackBy: trackById"
  public trackById(index: number, ricetta: IRecipe) {
    return ricetta._id;
  }

  public removePreferiti(ricetta: IRecipe, index: number) {
    const userId = this.authService.getUserId();

    // this.clicked[index] = true;

    this.userService.removePreferito(userId, ricetta._id).subscribe({
      next: (resp: { message: string }) => {
        console.log(resp);
        this.toastService.show(
          'info',
          'rimozione preferiti',
          `${ricetta.title}: ${resp.message}`,
          'removePreferiti'
        );
        // Aggiorna l'array ricette rimuovendo l'elemento eliminato
        // grazie alla change detection angular rileva le modifiche ad una delle proprità presenti nel dom e refresha il componente di conseguenza
        // SE VUOI AGGIORNARE IL DOM DOPO UNA MODIFICA, ELIMINA DALLA PROPRIETà CHE OSPITA IL DATO IL DATO CHE HAI APPENA FETCHATO
        this.getArrayPreferiti(this.email);
        // this.clicked = this.clicked.filter((bool) => bool !== false);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
  }
}
