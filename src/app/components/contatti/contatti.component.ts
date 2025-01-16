import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contatti',
  standalone: false,

  templateUrl: './contatti.component.html',
  styleUrl: './contatti.component.scss',
})
export class ContattiComponent {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    oggetto: new FormControl('', [Validators.required]),
    messaggio: new FormControl('', [Validators.required]),
  });

  // metodo richiamato al submit del form
  public onSubmit() {
    console.log(this.form.value);
  }
}
