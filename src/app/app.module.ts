import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
// import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { HomeComponent } from './components/home/home.component';
import { CardRicettaComponent } from './components/shared/card-ricetta/card-ricetta.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ContattiComponent } from './components/contatti/contatti.component';
import { DettaglioRicettaComponent } from './components/recipes/dettaglio-ricetta/dettaglio-ricetta.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RegistrationComponent } from './components/user/registration-template-driven/registration.component';
import { RegistrationReactiveFormComponent } from './components/user/registration-reactive-form/registration-reactive-form.component';
import { InserisciRicettaComponent } from './components/inserisci-ricetta/inserisci-ricetta.component';
import { ModaleComponent } from './components/modale/modale.component';
import { LoginComponent } from './components/login/login.component';
import { ProfiloComponent } from './components/user/profilo/profilo.component';
import { SharedModule } from './components/shared/shared.module';
import { DeleteRecipeComponent } from './components/recipes/delete-recipe/delete-recipe.component';
//modulo principale dell applicazione,
// tutti i componenti e i moduli che vogliamo utilizzare devono essere importati qui
// in particolare il pacchetto BrowserModule è gia presente di default, aggiungiamo anche BrowserAnimationsModule,
//che si tratta del modulo che ci permette di utilizzare le animazioni in Angular tramite la libreria primeng.

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // CarouselComponent,
    // RecipesComponent,
    // HomeComponent,
    // CardRicettaComponent,
    FooterComponent,
    ContattiComponent,
    DettaglioRicettaComponent,
    // RecipesListComponent,
    RegistrationComponent,
    RegistrationReactiveFormComponent,
    // InserisciRicettaComponent,
    // ModaleComponent,
    LoginComponent,
    ProfiloComponent,
    // DeleteRecipeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // NgbModule,
    // CardModule,
    ButtonModule,
    NgbCollapseModule,
    // FormsModule,
    // ReactiveFormsModule,
    PasswordModule,
    DropdownModule,
    DividerModule,
    PaginatorModule,
    HttpClientModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    // EditorModule,
    ToastModule,
    SharedModule, // contiene homecomponent e modalecomponent da passare sia ad app che recipe module ('città')
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
