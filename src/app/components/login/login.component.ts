import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUserDetail } from '../../models/user.model';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  // providers: [MessageService],
})
export class LoginComponent implements OnDestroy {
  email = '';
  password = '';
  user: IUserDetail | undefined;
  errMsg: string = '';
  private router = inject(Router);
  private authService = inject(AuthService);

  private TimeOutId;
  // private messageService = inject(MessageService);

  constructor(private toastService: ToastService) {}

  public onSubmit(form) {
    if (form.email !== '' && form.password !== '') {
      this.authService.login(form.email, form.password).subscribe({
        next: (res: IUserDetail) => {
          this.user = res;
          if (res) {
            this.authService.saveStorage(res);
            this.toastService.show(
              'success',
              'login Effettuato con successo.',
              'SUCCESSO',
              'msgLogin'
            );
            this.TimeOutId = setTimeout(() => {
              this.router.navigateByUrl('/home');
            }, 2000);
            this.resetFields();
          } else {
            this.errMsg = 'username o password errate.';
          }
        },
        error: (err) => {
          console.error(err);
          this.toastService.show(
            'error',
            'errore in fase di login. Riprova.',
            'ERRORE',
            'msgLogin'
          );
          this.resetFields();
        },
      });
    }
  }

  // show(severity: string, content: string, summary: string) {
  //   this.messageService.add({
  //     severity: severity,
  //     summary: summary,
  //     detail: content,
  //     key: 'msgLogin',
  //   });
  // }

  ngOnDestroy(): void {
    clearTimeout(this.TimeOutId);
  }

  resetFields() {
    this.email = '';
    this.password = '';
  }
}
