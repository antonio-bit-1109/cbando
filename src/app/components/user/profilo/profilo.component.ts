import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Iuser, IUserDetail } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profilo',
  standalone: false,

  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss',
})
export class ProfiloComponent implements OnInit {
  public userLocalStorage: Iuser | undefined;
  public user: IUserDetail | undefined;
  sidebarVisible: boolean = false;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userLocalStorage = this.authService.getStorage();
    this.userService.GetDetailUser(this.userLocalStorage.email).subscribe({
      next: (userData) => {
        this.user = userData;
        console.log(this.user);
      },
      error: (err) => {
        console.error(
          'ERRORE DURANTE CHIAMATA AL DETTAGLIO DELL UTENTE.' + err
        );
      },
    });
  }
}
