import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { DettaglioRicettaComponent } from './components/recipes/dettaglio-ricetta/dettaglio-ricetta.component';

const routes: Routes = [
  // rotta di default per l'index dell URL
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'ricette', component: RecipesComponent },
  { path: 'dettaglio/:_id', component: DettaglioRicettaComponent },
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
