import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModaleComponent } from '../modale/modale.component';
import { DialogModule } from 'primeng/dialog';
import { HomeComponent } from '../home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CardRicettaComponent } from './card-ricetta/card-ricetta.component';
import { InserisciRicettaComponent } from '../inserisci-ricetta/inserisci-ricetta.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    ModaleComponent,
    HomeComponent,
    CarouselComponent,
    CardRicettaComponent,
    InserisciRicettaComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    NgbModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    RouterModule,
    EditorModule,
    ButtonModule,
  ],
  exports: [
    ModaleComponent,
    HomeComponent,
    CarouselComponent,
    CardRicettaComponent,
    InserisciRicettaComponent,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    RouterModule,
    EditorModule,
    ButtonModule,
  ],
})
export class SharedModule {}
