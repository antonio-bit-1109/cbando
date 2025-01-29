import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Iuser, IUserDetail } from '../models/user.model';

interface user {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  apiBaseURL = 'api/users';

  // metodi per fare il login

  //metodo che prende i dati utente e li salva nel local storage
  public saveStorage(res: IUserDetail) {
    const user = {
      id: res._id,
      name: res.name,
      email: res.email,
      password: res.password,
      role: res.role,
    };

    localStorage.setItem('userData', JSON.stringify(user));
  }

  // metodo che controlla se un utente è loggato o no,
  //  ovvero se esistono dati utente salvati nel local storage.
  public isLogged(): boolean {
    return JSON.parse(localStorage.getItem('userData')) !== null;
  }

  public isAdmin(): boolean {
    const user: IUserDetail = JSON.parse(localStorage.getItem('userData'));
    return user.role === 'admin';
  }

  // cancella dati dal localstorage
  public logout() {
    localStorage.removeItem('userData');
  }

  public login(myemail: string, mypassword: string) {
    const user = { email: myemail, password: mypassword };
    return this.http.post(`${this.apiBaseURL}/login`, user);
  }

  public getStorage() {
    if (localStorage.getItem('userData') !== null) {
      return JSON.parse(localStorage.getItem('userData'));
    } else {
      console.error('local storage è vuoto');
    }
  }

  public getUserEmail(): string {
    const userData: Iuser = this.getStorage();
    return userData.email;
  }

  public getUserId(): string | null {
    if (localStorage.getItem('userData') !== null) {
      const token = JSON.parse(localStorage.getItem('userData'));
      return token.id;
    }

    return null;
  }
}
