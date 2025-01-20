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

  public onHide() {
    this.visible = false;
    this.visibleEmitter.emit(this.visible);
  }

  public receiveEmission(event) {
    this.visible = event;
  }
}
