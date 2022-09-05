import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html'
  
})
export class Grafica1Component  {
  public labels1: string[] = ['Pan', 'Bebidas', 'Snikert'];
  public data1 = [150, 200, 500] ; 
  public colors1 = ['#e0fbfc', '#ee6c4d', '#293241'];
  public labelsX: string[] = ['Uñas', 'Cejas', 'Delineados'];
  public data1X = [50, 60, 2] ; 
  public colorsX = ['#e5989b', '#b5838d', '#6d6875'];

}
