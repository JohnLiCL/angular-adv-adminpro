import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html'
  
})
export class Grafica1Component  {
  public labels1: string[] = ['Pan', 'Bebidas', 'Snikert'];
  public data1 = [150, 200, 500] ; 
  public colors1 = ['#e0fbfc', '#ee6c4d', '#293241'];

}
