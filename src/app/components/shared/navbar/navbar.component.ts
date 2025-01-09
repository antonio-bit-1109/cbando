import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
   titolo = "CBando"
   private evidenziato = false;

   
    public changeEvidenziato(){
     return this.evidenziato = !this.evidenziato;
    }

    public getEvidenziato(){
      return this.evidenziato;
    }

  public getRandomColor(){
    let color = "#"
    for(let i = 0; i< 6 ; i++){
      color += Math.floor(Math.random() * 9).toString();
    }
    return color;
  }
}
