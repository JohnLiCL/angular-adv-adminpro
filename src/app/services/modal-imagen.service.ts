import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const urlApi = environment.urlApi;


@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id!: string;
  public img!: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string = ' ', img: string = 'no-image') {

    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${urlApi}/upload/${tipo}/${img}`;
    }
    //console.log(this.img);
    
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

}
