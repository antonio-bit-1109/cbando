import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-delete-recipe',
  standalone: false,

  templateUrl: './delete-recipe.component.html',
  styleUrl: './delete-recipe.component.scss',
  // providers: [MessageService],
})
export class DeleteRecipeComponent implements OnInit, OnDestroy {
  public nomeRicetta: string | undefined;
  public idRicetta: string | undefined;

  public idTimeOut;
  public page: string | undefined;
  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService // private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.paramMap.get('_id');
    const title: string = this.activatedRoute.snapshot.paramMap.get('title');
    const page: string = this.activatedRoute.snapshot.paramMap.get('page');
    this.nomeRicetta = title;
    this.idRicetta = id;
    this.page = page;
    console.log(this.nomeRicetta);
    console.log(this.idRicetta);
  }

  ngOnDestroy(): void {
    if (this.idTimeOut) {
      clearTimeout(this.idTimeOut);
    }
  }

  public deleteRicetta() {
    this.recipeService.deleteRecipe(this.idRicetta).subscribe({
      next: (resp) => {
        console.log(resp);
        this.toastService.show(
          'success',
          'ricetta cancellata con successo',
          'cancellazione dettaglio',
          'cancRicetta'
        );
        this.idTimeOut = setTimeout(() => {
          this.router.navigateByUrl('home');
        }, 3000);
      },
      error: (err) => {
        console.error(err);
        this.toastService.show(
          'error',
          'errore durante la cancellazione della ricetta',
          'cancellazione dettaglio',
          'cancRicetta'
        );
        this.idTimeOut = setTimeout(() => {
          this.router.navigateByUrl('home');
        }, 3000);
      },
    });
  }

  // show(severity: string, summary: string, detail: string) {
  //   this..messageService.add({
  //     severity: severity,
  //     summary: summary,
  //     detail: detail,
  //     key: 'cancRicetta',
  //   });
  // }
}
