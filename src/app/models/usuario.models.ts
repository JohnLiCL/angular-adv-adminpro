import { environment } from "src/environments/environment";

const urlApi = environment.urlApi;

export class Usuario {
  constructor(
    public nombre: string,
    public apellido: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
  ) { }

  get imagenUrl() {
    //localhost:3000/api/upload/usuarios/b5bae541-c9bf-4f81-9895-ce94d2493065.png
    if (this.img?.includes('https')) {
      return this.img;
    }

    if (this.img) {
      return `${urlApi}/upload/usuarios/${this.img}`;
    } else {
      return `${urlApi}/upload/usuarios/no-image`;
    }

  }
}