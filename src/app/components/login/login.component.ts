import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUserDetail } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  user: IUserDetail | undefined;
  errMsg: string = '';
  private router = inject(Router);
  private authService = inject(AuthService);

  public onSubmit(form) {
    console.log(form.value);
    if (form.email !== '' && form.password !== '') {
      this.authService.login(form.email, form.password).subscribe({
        next: (res: IUserDetail) => {
          this.user = res;
          if (res) {
            this.authService.saveStorage(res);
            this.router.navigateByUrl('/home');
          } else {
            this.errMsg = 'username o password errate.';
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
