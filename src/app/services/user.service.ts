import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { IDataRegistration } from '../models/dataRegistration.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public datiUtente = new ReplaySubject<IDataRegistration>();
  public dataContatti = new Subject();
  constructor() {}
}
