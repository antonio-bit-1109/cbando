import {
  Component,
  Input,
  Output,
  EventEmitter,
  input,
  inject,
} from '@angular/core';
import { IRecipe } from '../../../models/recipes.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-card-ricetta',
  standalone: false,

  templateUrl: './card-ricetta.component.html',
  styleUrl: './card-ricetta.component.scss',
})
export class CardRicettaComponent {
  private sanitizer = inject(DomSanitizer);
  private activatedRoute = inject(ActivatedRoute);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  // variabile di input nel figlio che accetta un parametro dal padre
  // undefined nel caso in cui le ricette non vengon subito fetchata dal backend
  @Input() ricettaFiglio: IRecipe | undefined;
  // varibile di output dal figlio al padre
  @Output() msgOutput = new EventEmitter();

  @Input() page: number | undefined | string;

  public heartClicked = false;
  private defaultURLImage =
    'https://media.istockphoto.com/id/1396814518/it/vettoriale/immagine-in-arrivo-nessuna-foto-nessuna-immagine-in-miniatura-disponibile-illustrazione.jpg?s=2048x2048&w=is&k=20&c=JrtawqzdBNu2u9zZvkP10KLBozTxsaXPl0BxjuaUtMY=';

  // metodi utili
  public troncaDescrizione(descrizione: string, Maxlength: number) {
    if (descrizione.length > Maxlength) {
      return descrizione.substring(0, Maxlength) + '...';
    }

    return descrizione;
  }

  public isAvailable(isAvalaible: boolean) {
    let disponibile = '';
    let colorFrame = '';

    if (isAvalaible) {
      disponibile = 'Disponibile';
      colorFrame = 'green';
    } else {
      disponibile = 'Non Disponibile';
      colorFrame = 'red';
    }

    return [disponibile, isAvalaible, colorFrame];
  }

  public giveDefaultImageIfNotPresent(imageURL: string) {
    if (!imageURL.startsWith('https://www') && imageURL === '') {
      return this.defaultURLImage;
    }
    return imageURL;
  }

  public inviaTitolo(titolo: string) {
    this.msgOutput.emit(titolo);
  }

  public formatDate(date: string) {
    return date;
  }

  public accorciaDescrizione(descrizione: string): string {
    const lunghezzaDescr = 200;
    if (descrizione.length <= lunghezzaDescr) {
      return descrizione;
    }

    const ultimaPosizioneSpazio = descrizione.lastIndexOf(' ', lunghezzaDescr);
    return descrizione.slice(0, ultimaPosizioneSpazio);
  }

  public handleHeart() {
    this.heartClicked = !this.heartClicked;
    const userId = this.authService.getUserId();

    // se il cuore viene impostato come filled faccio la fetch per pushare nel array dell'utente id del prodotto
    if (this.heartClicked) {
      this.userService.addPreferiti(userId, this.ricettaFiglio._id).subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
        },
      });

      return;
    }

    // se il cuore vien reso di nuovo empty tolgo id prodotto dall array dell utente.
    if (!this.heartClicked) {
      this.userService
        .removePreferito(userId, this.ricettaFiglio._id)
        .subscribe({
          next: (resp) => {
            console.log(resp);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);
          },
        });

      return;
    }
  }

  public isUserLogged() {
    return this.authService.isLogged();
  }
}
