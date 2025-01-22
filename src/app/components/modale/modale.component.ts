import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modale',
  standalone: false,

  templateUrl: './modale.component.html',
  styleUrl: './modale.component.scss',
})
export class ModaleComponent {
  @Input() visible: boolean = false;
  @Output() visibleEmitter = new EventEmitter<boolean>();

  // prendo la resp in arrivo dal componente inserisci ricetta che ha fatto la fetch e sto riportando fino al padre ricetta tale resp che è un any[] [boolean , string]
  @Input() resp: [boolean, string];

  @Output() inviaEsitoPostRicetta = new EventEmitter();

  public onHide() {
    this.visible = false;
    this.visibleEmitter.emit(this.visible);
  }

  public receiveEmission(event) {
    this.visible = event;
  }

  public receiveEsitoPostRicetta(event) {
    this.resp = event;
    this.inviaEsitoPostRicetta.emit(this.resp);
  }
}
