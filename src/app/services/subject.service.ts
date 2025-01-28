import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  public arrayPreferitiUtente = new BehaviorSubject<string[] | null>(null);

  constructor() {}

  // metodi per riempire un subject con i preferiti dell utente senza dover rifare la fetch
  public fillArrayPreferitiUtente(arrayPreferiti: string[]) {
    this.arrayPreferitiUtente.next(arrayPreferiti);
  }

  public getArrayPrefeUser() {
    return this.arrayPreferitiUtente.asObservable();
  }
}
