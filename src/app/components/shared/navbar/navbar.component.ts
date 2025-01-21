import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

interface user {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements DoCheck {
  titolo = 'CBando';
  private evidenziato = false;
  private isCollapsed = false;

  public user: user | undefined;
  constructor(private router: Router, public authService: AuthService) {}

  // viene chiamato dopo l'init del componente
  // resta in ascolto di eventuali cambiamenti
  ngDoCheck(): void {
    if (JSON.parse(localStorage.getItem('userData')) !== null) {
      this.user = JSON.parse(localStorage.getItem('userData'));
    }
  }

  public changeEvidenziato() {
    return (this.evidenziato = !this.evidenziato);
  }

  public getEvidenziato() {
    return this.evidenziato;
  }

  public logOut() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
  // public getRandomColor() {
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += Math.floor(Math.random() * 9).toString();
  //   }
  //   return color;
  // }

  public changeCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  public getCollapsed() {
    return this.isCollapsed;
  }
}
