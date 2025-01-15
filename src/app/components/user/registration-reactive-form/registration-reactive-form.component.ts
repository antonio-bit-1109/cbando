import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
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
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/ // password che deve contenere char speciale lunga da 8 a 16 char
      ),
    ]),
    ripetiPassword: new FormControl('', [Validators.required]),
    accetto: new FormControl(false, [Validators.requiredTrue]),
  });
  constructor(private userService: UserService, private router: Router) {}

  public onSubmit() {
    console.log(this.form.value);

    // all on submit invio i dati al service per gestire questi dati tramite subject
    const datiForm = {
      nome: this.form.controls.name.value,
      email: this.form.controls.email.value,
    };

    this.userService.datiUtente.next(datiForm);
    // this.router.navigate(['home']);
    this.router.navigateByUrl('home');
  }

  public isConfermaPasswordMatch(form: FormGroup) {
    const password = form.get('password').value;
    const confermaPassword = form.get('ripetiPassword').value;

    if (password !== confermaPassword) {
      return false;
    }
    return true;
  }

  public isFormvalid(form: FormGroup) {
    return form.valid;
  }
}
