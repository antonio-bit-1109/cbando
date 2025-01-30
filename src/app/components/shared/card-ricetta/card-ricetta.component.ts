import {
  Component,
  Input,
  Output,
  EventEmitter,
  input,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IRecipe } from '../../../models/recipes.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SubjectService } from '../../../services/subject.service';
@Component({
  selector: 'app-card-ricetta',
  standalone: false,

  templateUrl: './card-ricetta.component.html',
  styleUrl: './card-ricetta.component.scss',
  providers: [MessageService],
})
export class CardRicettaComponent {
  private sanitizer = inject(DomSanitizer);
  private activatedRoute = inject(ActivatedRoute);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private subjectService = inject(SubjectService);
  // variabile di input nel figlio che accetta un parametro dal padre
  // undefined nel caso in cui le ricette non vengon subito fetchata dal backend
  @Input() ricettaFiglio: IRecipe | undefined;
  // varibile di output dal figlio al padre
  @Output() msgOutput = new EventEmitter();

  @Input() page: number | undefined | string;

  @Input() arrPreferiti: string[] | undefined;

  @Output() public warningRefetchUser = new EventEmitter();

  public urlCorrente: string | undefined;
  public heartClicked = false;
  private defaultURLImage =
    'https://media.istockphoto.com/id/1396814518/it/vettoriale/immagine-in-arrivo-nessuna-foto-nessuna-immagine-in-miniatura-disponibile-illustrazione.jpg?s=2048x2048&w=is&k=20&c=JrtawqzdBNu2u9zZvkP10KLBozTxsaXPl0BxjuaUtMY=';

  constructor() {
    this.urlCorrente = this.router.url;

    // console.log(this.urlCorrente);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['arrPreferiti']) {
  //     this.ricettaGiaPreferita();
  //   }
  // }

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

  // public inviaTitolo(titolo: string) {
  //   this.msgOutput.emit(titolo);
  // }

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

  //MODIFICA LA LOGICA DI CHIAMATA
  // SE IL VALORE DI HEARTCILCKED è VUOTO CHIAMO PER FARE UN AGGIUNTA
  // SE IL VALORE DI HEART CLICKED è PIENO CHIAMO PER RIMUOVERE DAI PREFERITI
  // RI CONTROLLA UN PO TUTTO IL GIRO CHE FA COMPONENTE PADRE FIGLIO PER RENDERIZZARE LA VISTA DEL CUORE
  // UTILIZZA ONCHANGES PER CONTROLLARE LE MODIFICHE ALLA VARIABILE IN INPUT CHE CONTIENE ARRAY PREFERITI
  public handleHeart(value: boolean) {
    this.heartClicked = value;
    const userId = this.authService.getUserId();

    // se il cuore viene impostato come filled faccio la fetch per pushare nel array dell'utente id del prodotto e rifaccio la get dei dati utente
    if (this.heartClicked) {
      this.userService.addPreferiti(userId, this.ricettaFiglio._id).subscribe({
        next: (resp: { message: string }) => {
          console.log(resp);
          this.show(
            'success',
            'aggiunta preferiti',
            `${this.ricettaFiglio.title}: ${resp.message}`
          );
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
        },
      });
    }

    // se il cuore vien reso di nuovo empty tolgo id prodotto dall array dell utente.
    if (!this.heartClicked) {
      this.userService
        .removePreferito(userId, this.ricettaFiglio._id)
        .subscribe({
          next: (resp: { message: string }) => {
            console.log(resp);
            this.show(
              'info',
              'rimozione preferiti',
              `${this.ricettaFiglio.title}: ${resp.message}`
            );
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);
          },
        });
    }

    // alla fine rifetcho i dati dello user per aggiornare la vista dei preferiti
    this.warningRefetchUser.emit(true);
  }

  public isUserLogged() {
    return this.authService.isLogged();
  }

  public ricettaGiaPreferita() {
    if (
      this.arrPreferiti.find((id) => id === this.ricettaFiglio._id.toString())
    ) {
      this.heartClicked = true;
      return true;
    }
    this.heartClicked = false;
    return false;
  }

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 2000,
      key: 'addPreferiti',
    });
  }
}
