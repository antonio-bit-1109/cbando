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
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    RouterModule,
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
  ],
})
export class SharedModule {}
