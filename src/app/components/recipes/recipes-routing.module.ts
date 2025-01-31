import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { DettaglioRicettaComponent } from './dettaglio-ricetta/dettaglio-ricetta.component';
import { deleteRicettaGuard } from '../../guards/delete-ricetta.guard';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ModificaRicettaComponent } from '../modifica-ricetta/modifica-ricetta.component';
import { modificaRicettaGuard } from '../../guards/modifica-ricetta.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   component: RecipesComponent,
  //   children: [
  //     { path: 'dettaglio/:title/:_id', component: DettaglioRicettaComponent },
  //     { path: 'dettaglio/:_id', component: DettaglioRicettaComponent },
  //     {
  //       path: 'cancella/:title/:_id',
  //       component: DeleteRecipeComponent,
  //       canActivate: [deleteRicettaGuard],
  //     },
  //     { path: '', component: RecipesListComponent, pathMatch: 'full' },
  //   ],
  // },

  { path: '', component: RecipesListComponent },
  { path: ':page', component: RecipesListComponent },
  {
    path: 'dettaglio/:title/:page/:_id',
    component: DettaglioRicettaComponent,
  },
  { path: 'dettaglio/:_id', component: DettaglioRicettaComponent },
  {
    path: 'cancella/:title/:page/:_id',
    component: DeleteRecipeComponent,
    canActivate: [deleteRicettaGuard],
  },
  {
    path: 'modificaRicetta/:title/:page/:_id',
    component: ModificaRicettaComponent,
    canActivate: [modificaRicettaGuard],
  },

  // {
  //   path: 'modificaRicetta/:_id',
  //   component: ModificaRicettaComponent,
  //   canActivate: [modificaRicettaGuard],
  // },
];

@NgModule({
  // moduli di utility per applicazione
  imports: [RouterModule.forChild(routes)],
  // moduli accessibili anche all esterno
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
