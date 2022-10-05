import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const urlApi = environment.urlApi;


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | undefined, tipo: 'usuarios' | 'medicos' | 'hospitales'): unknown {

    if (!img) {
      return `${urlApi}/upload/${tipo}/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${urlApi}/upload/${tipo}/${img}`;
    } else {
      return `${urlApi}/upload/${tipo}/no-image`;
    }
  }

}

