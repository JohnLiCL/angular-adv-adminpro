import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.models';

const urlApi = environment.urlApi + '/hospitales';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  createHospital(nombre: string) {
    //localhost:3000/api/hospitales
    return this.http.post(urlApi, {nombre}, this.headers);
  }
  
  readHospitales() {
    //localhost:3000/api/hospitales
    return this.http.get<any>(urlApi, this.headers)
      .pipe(
        map( (resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales)
      );
  }

  updateHospital( _id: string, nombre: string) {
    //localhost:3000/api/hospitales
    const url = `${urlApi}/${_id}`
    return this.http.put(url, {nombre}, this.headers);
  }

  deleteHospital( _id: string) {
    //localhost:3000/api/hospitales
    const url = `${urlApi}/${_id}`
    return this.http.delete(url, this.headers);
  }
  
}
