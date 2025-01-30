import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Iuser } from '../../../models/user.model';
import { ToastService } from '../../../services/toast.service';
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
  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  public onSubmit() {
    console.log(this.form.value);

    // all on submit invio i dati al service per gestire questi dati tramite subject
    // const datiForm = {
    //   nome: this.form.controls.name.value,
    //   email: this.form.controls.email.value,
    // };

    const dataUser: Iuser = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      note: 'Note default',
    };

    this.userService.insertNewUser(dataUser).subscribe({
      next: (resp) => {
        console.log('Dati inviati con successo');
        this.toastService.show(
          'success',
          'registrazione',
          'Registrazione effettuata con successo',
          'msgRegister'
        );
      },
      error: (err) => {
        console.error(err);
        this.toastService.show(
          'error',
          'registrazione',
          'Errore in fase di registrazione',
          'msgRegister'
        );
      },
    });
    // this.userService.datiUtente.next(datiForm);
    // this.router.navigate(['home']);
    setTimeout(() => {
      this.router.navigateByUrl('home');
    }, 2000);
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
