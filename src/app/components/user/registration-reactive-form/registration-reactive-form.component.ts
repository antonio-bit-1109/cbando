import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-registration-reactive-form',
  standalone: false,

  templateUrl: './registration-reactive-form.component.html',
  styleUrl: './registration-reactive-form.component.scss',
})
export class RegistrationReactiveFormComponent {
  // ricreo l oggetto formGroup che viene impostato in automatico del template driven
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    ripetiPassword: new FormControl('', [Validators.required]),
    accetto: new FormControl(false, [Validators.requiredTrue]),
  });

  public onSubmit() {
    console.log(this.form.value);
  }
}
