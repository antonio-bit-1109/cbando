import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDataContatti } from '../../models/dataContatto.model';
import { Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-contatti',
  standalone: false,

  templateUrl: './contatti.component.html',
  styleUrl: './contatti.component.scss',
})
export class ContattiComponent {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    oggetto: new FormControl('', [Validators.required]),
    messaggio: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private subjectService: SubjectService) {
    this.subjectService.setCurrentRoute(this.router.url);
  }

  // metodo richiamato al submit del form
  public onSubmit() {
    console.log(this.form.value);

    if (this.form.value) {
      const dataContatti: IDataContatti = {
        name: this.form.controls.name.value,
        oggetto: this.form.controls.oggetto.value,
      };
    } else {
      console.error('nessun dato presente nel form');
    }
  }

  public getIsFormValid() {
    return this.form.valid;
  }
}
