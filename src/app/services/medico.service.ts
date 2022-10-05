import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.models';


const urlApi = environment.urlApi + '/medicos';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  createMedico(medico: { nombre: string, hospital: string }) {
    //localhost:3000/api/hospitales
    return this.http.post(urlApi, medico, this.headers);
  }

  readMedicos() {
    return this.http.get<any>(urlApi, this.headers)
      .pipe(
        map((resp: { ok: boolean, medicos: Medico[] }) => resp.medicos)
      );
  }

  updateMedico(medico: Medico) {
    //localhost:3000/api/hospitales
    const url = `${urlApi}/${medico._id}`
    return this.http.put(url, medico, this.headers);
  }

  deleteMedico(_id: string) {
    //localhost:3000/api/hospitales
    const url = `${urlApi}/${_id}`
    return this.http.delete(url, this.headers);
  }

  getMedico(id: string) {
    return this.http.get<any>(`${urlApi}/${id}`, this.headers)
      .pipe(
        map((resp: { ok: boolean, medico: Medico }) => resp.medico)
      );
  }
}