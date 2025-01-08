import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//modulo principale dell applicazione, 
// tutti i componenti e i moduli che vogliamo utilizzare devono essere importati qui
// in particolare il pacchetto BrowserModule è gia presente di default, aggiungiamo anche BrowserAnimationsModule, 
//che si tratta del modulo che ci permette di utilizzare le animazioni in Angular tramite la libreria primeng.

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule 
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
