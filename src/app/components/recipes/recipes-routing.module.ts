import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { DettaglioRicettaComponent } from './dettaglio-ricetta/dettaglio-ricetta.component';
import { deleteRicettaGuard } from '../../guards/delete-ricetta.guard';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

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
  { path: 'dettaglio/:title/:_id', component: DettaglioRicettaComponent },
  { path: 'dettaglio/:_id', component: DettaglioRicettaComponent },
  {
    path: 'cancella/:title/:_id',
    component: DeleteRecipeComponent,
    canActivate: [deleteRicettaGuard],
  },
];

@NgModule({
  // moduli di utility per applicazione
  imports: [RouterModule.forChild(routes)],
  // moduli accessibili anche all esterno
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
