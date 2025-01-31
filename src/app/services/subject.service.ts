import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private textRicercaNavbar = new BehaviorSubject<string | null>(null);
  private currentRoute = new BehaviorSubject<string | null>(null);

  public fillText(stringVal: string | null) {
    this.textRicercaNavbar.next(stringVal);
  }
  public setCurrentRoute(currentURL: string) {
    this.currentRoute.next(currentURL);
  }

  public $subjectText_Observ = this.textRicercaNavbar.asObservable();
  public $currentRoute = this.currentRoute.asObservable();
}
