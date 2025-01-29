import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
// import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-preferiti',
  standalone: false,

  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss',
})
export class PreferitiComponent {
  public arrayPreferiti: string[] | undefined;

  constructor(
    private recipeService: RecipeService
  ) // private subjectService: SubjectService
  {
    // this.subjectService.getArrayPrefeUser().subscribe({
    //   next: (arrPrefeService: string[]) => {
    //     if (arrPrefeService && arrPrefeService.length) {
    //       this.arrayPreferiti = arrPrefeService;
    //       console.log(this.arrayPreferiti);
    //     } else {
    //       console.error('array prefe vuoto.');
    //     }
    //   },
    // });
    // this.recipeService.getDetailRicetta()
  }
}
