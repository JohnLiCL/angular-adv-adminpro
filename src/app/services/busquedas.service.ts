import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchAll } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.models';

const urlApi = environment.urlApi


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private trasnformaUsuario(resultado: any[]): Usuario[] {
    return resultado.map(
      user => new Usuario(
        user.nombre,
        user.apellido,
        user.email,
        '',
        user.img,
        user.google,
        user.role,
        user.uid)
    );
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales',
    strBusqueda: string) {
    //localhost:3000/api/busqueda/coleccion/usuarios/j
    const url = `${urlApi}/busqueda/coleccion/${tipo}/${strBusqueda}`
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.trasnformaUsuario(resp.data);
            default:
              return [];
          }
        })
      );
  }
}
