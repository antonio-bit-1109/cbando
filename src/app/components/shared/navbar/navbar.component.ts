import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SubjectService } from '../../../services/subject.service';

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

  public ricercaText: string | undefined | null;
  constructor(
    private router: Router,
    public authService: AuthService,
    private subjectService: SubjectService
  ) {}

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

  public changeCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  public getCollapsed() {
    return this.isCollapsed;
  }

  public avviaRicerca() {
    this.subjectService.fillText(this.ricercaText);
  }

  public cancellaTestoRicerca() {
    this.ricercaText = null;
    this.subjectService.fillText(null);
  }

  public onSubmit() {
    this.avviaRicerca();
  }
}
