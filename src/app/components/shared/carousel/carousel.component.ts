import { Component } from '@angular/core';
import { Iimage } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-carousel',
  standalone: false,
  
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})

export class CarouselComponent {
  private percorso = "../../assets/images/carousel-";
  private string = ".jpg";

  public getUrlImage(imageId: number): string {
    return `${this.percorso}${imageId}${this.string}`;
  }

  public getDescription(image:Iimage){
    return image.desc;
  }

  public getDescription2(image:Iimage){
    return image.desc2;
  }

  public getGeneralAlt(image: Iimage){
    return `immagine di ${image.desc}`;
  }

  images = [
    { id : 1  , desc:"piatto di pasta " , desc2 : "con pomodoro e basilico" },
    { id : 2 , desc: "carne" , desc2 : "succulenta e cremosa" },
    { id : 3 ,  desc : "tiramisù con fragole" , desc2 : "dolce e cremoso" },
]
}
