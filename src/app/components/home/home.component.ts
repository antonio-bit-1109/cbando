import {
  Component,
  ViewChild,
  ElementRef,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe } from '../../models/recipes.model';
import { UserService } from '../../services/user.service';
import { IDataRegistration } from '../../models/dataRegistration.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from '../../services/subject.service';
import { Router } from '@angular/router';
// import { ViewChild, ElementRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  // riferimento ad un elemento del DOM - HTML
  @ViewChild('modaleRegistrazione', { static: true })
  DomELementModal: ElementRef;
  public ricette: IRecipe[] = [];
  public datiRegistrazione: IDataRegistration | null = null;
  public idModale = '';
  public nomeModale = '';
  public cognomeModale = '';

  public isLoaded = false;

  //costrutt
  constructor(
    private RecipeService: RecipeService,
    private userService: UserService,
    private ngbModal: NgbModal,
    private subjectService: SubjectService,
    private router: Router
  ) {
    this.subjectService.setCurrentRoute(this.router.url);

    this.RecipeService.getRecipes().subscribe({
      next: (response) => {
        this.ricette = this.SortRicetteFromLast_takeOnly4(response);
        console.log(this.ricette);
      },
      error: (err) => {
        console.error(err);
      },
    });

    // la prop datiRegistrazione verrà popolata con i dati presenti nel subject userservice
  }

  ngAfterViewInit(): void {
    this.userService.datiUtente.subscribe((res) => {
      this.datiRegistrazione = res;
      // this.userService.datiUtente.next(null);
      this.openModal(this.DomELementModal);
      // localStorage.setItem('datiReg', JSON.stringify(res));
    });
  }

  private SortRicetteFromLast_takeOnly4(recipes: IRecipe[]) {
    return recipes.sort((a, b) => b._id - a._id).slice(0, 4);
  }

  // specifico nel parametro quale sia il nome del modale da chiamare
  // mi porto nel parametro tutti i dati du cui ho bisogno
  // dentro open posso passare delle options per come si deve vedere il modale
  public openModal(content: any, id?: string, nome?: string, cognome?: string) {
    this.idModale = id;
    this.nomeModale = nome;
    this.cognomeModale = cognome;

    this.ngbModal
      .open(content, {
        centered: true,
        ariaLabelledBy: 'apertura modale con dati registrazione',
        size: 'md',
        role: 'alertdialog',
      })
      .result.then((res) => {
        console.log('azione da eseguire , dati res' + res);
      })
      .catch((err) => {
        console.log('nessuna azione da eseguire' + err);
      });
  }

  public toggleRicette() {
    this.isLoaded = !this.isLoaded;
  }
}
