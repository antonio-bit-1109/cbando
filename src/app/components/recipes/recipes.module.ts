import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { InserisciRicettaComponent } from '../inserisci-ricetta/inserisci-ricetta.component';
import { CardRicettaComponent } from '../shared/card-ricetta/card-ricetta.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { ModificaRicettaComponent } from '../modifica-ricetta/modifica-ricetta.component';

import { HttpClientModule } from '@angular/common/http';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { ModaleComponent } from '../modale/modale.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { HomeComponent } from '../home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service';

@NgModule({
  //componenti
  declarations: [
    RecipesComponent,
    // InserisciRicettaComponent,
    // CardRicettaComponent,
    RecipesListComponent,
    DeleteRecipeComponent,
    ModificaRicettaComponent,
  ],

  // moduli di utility per applicazione
  imports: [
    CommonModule,
    HttpClientModule,
    NgbCollapseModule,
    FormsModule,
    PaginatorModule,
    DividerModule,
    DropdownModule,
    PasswordModule,
    ToastModule,
    EditorModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    CardModule,
    NgbModule,
    RecipesRoutingModule,
    SharedModule,
    CheckboxModule,
  ],
  // moduli accessibili anche all esterno
  exports: [
    RecipesComponent,
    // InserisciRicettaComponent,
    // CardRicettaComponent,
    RecipesListComponent,
    DeleteRecipeComponent,
    // CardRicettaComponent,
  ],
  providers: [MessageService, ToastService],
})
export class RecipesModule {}
