import { inject, Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { IDataRegistration } from '../models/dataRegistration.model';
import { HttpClient } from '@angular/common/http';
import { Iuser, IUserDetail } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public http = inject(HttpClient);
  public datiUtente = new ReplaySubject<IDataRegistration>();
  public dataContatti = new Subject();

  public apiBaseUrl = 'api/users';
  constructor() {}

  public insertNewUser(userData: Iuser): Observable<Iuser> {
    return this.http.post<Iuser>(`${this.apiBaseUrl}/signup`, userData);
  }

  public GetDetailUser(email: string): Observable<IUserDetail> {
    const body = { email: email };
    return this.http.post<IUserDetail>(`${this.apiBaseUrl}/user`, body);
  }
}
