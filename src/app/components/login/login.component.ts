import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';

  public onSubmit(form) {
    console.log(form.value);
  }
}
