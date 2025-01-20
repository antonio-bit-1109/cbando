import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { DettaglioRicettaComponent } from './components/recipes/dettaglio-ricetta/dettaglio-ricetta.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RegistrationComponent } from './components/user/registration-template-driven/registration.component';
import { RegistrationReactiveFormComponent } from './components/user/registration-reactive-form/registration-reactive-form.component';
import { ContattiComponent } from './components/contatti/contatti.component';
import { InserisciRicettaComponent } from './components/inserisci-ricetta/inserisci-ricetta.component';

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
      // { path: 'inserisciRicetta', component: InserisciRicettaComponent },
      { path: '', component: RecipesListComponent, pathMatch: 'full' },
    ],
  },
  { path: 'registrazione', component: RegistrationReactiveFormComponent },
  { path: 'contatti', component: ContattiComponent },

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
