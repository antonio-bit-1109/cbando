import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { DettaglioRicettaComponent } from './components/recipes/dettaglio-ricetta/dettaglio-ricetta.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RegistrationReactiveFormComponent } from './components/user/registration-reactive-form/registration-reactive-form.component';
import { ContattiComponent } from './components/contatti/contatti.component';
import { LoginComponent } from './components/login/login.component';
import { ProfiloComponent } from './components/user/profilo/profilo.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { DeleteRecipeComponent } from './components/recipes/delete-recipe/delete-recipe.component';
import { deleteRicettaGuard } from './guards/delete-ricetta.guard';

const routes: Routes = [
  // rotta di default per l'index dell URL
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'ricette',
    component: RecipesComponent,
    children: [
      { path: 'dettaglio/:title/:_id', component: DettaglioRicettaComponent },
      { path: 'dettaglio/:_id', component: DettaglioRicettaComponent },
      {
        path: 'cancella/:_id',
        component: DeleteRecipeComponent,
        canActivate: [deleteRicettaGuard],
      },
      // { path: 'inserisciRicetta', component: InserisciRicettaComponent },
      { path: '', component: RecipesListComponent, pathMatch: 'full' },
    ],
  },
  { path: 'registrazione', component: RegistrationReactiveFormComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'profilo',
    component: ProfiloComponent,
    canActivate: [loggedInGuard], // qui passo la guardia che ritorna un booleano e mi attiva o rende inattiva la rotta in base a delle condizioni che stanno dentro la guardia
  },
  // se la rotta scelta non c'è, redirect alla home
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
