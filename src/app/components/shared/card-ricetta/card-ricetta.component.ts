import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { IRecipe } from '../../../models/recipes.model';
@Component({
  selector: 'app-card-ricetta',
  standalone: false,

  templateUrl: './card-ricetta.component.html',
  styleUrl: './card-ricetta.component.scss',
})
export class CardRicettaComponent {
  // variabile di input nel figlio che accetta un parametro dal padre
  // undefined nel caso in cui le ricette non vengon subito fetchata dal backend
  @Input() ricettaFiglio: IRecipe | undefined;
  // varibile di output dal figlio al padre
  @Output() msgOutput = new EventEmitter();

  @Input() page: string | undefined;
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
}
