import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';


import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const urlApi = environment.urlApi

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
  }

  async googleInit() {
    return new Promise<void>(resolve => {
      google.accounts.id.initialize({
        client_id: "43638030725-dfe8gl3jbmdrdhsth7edfargu9aum0i3.apps.googleusercontent.com",
        callback: (response: any) => this.handleCredentialResponse(response)
      });
      resolve();
    })
 }

  handleCredentialResponse(response: any) {
    //console.log("Encoded JWT ID token: " + response.credential);
    this.loginGoogle(response.credential)
      .subscribe(resp => {
        this.ngZone.run(() => {
          //console.log({ login: resp });
          //Navega al Dashboard
          this.router.navigateByUrl('/');
        });

      }, (err) => {
        console.log(err);
      });
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.disableAutoSelect();
            this.router.navigateByUrl('/login');
  }

  validaToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${urlApi}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${urlApi}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }
        )
      );
  }

  login(formData: LoginForm) {
    return this.http.post(`${urlApi}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }
        )
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${urlApi}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          //console.log('*****loginGoogle Respuesta: ',resp);
          localStorage.setItem('token', resp.token);
        }
        )
      );
  }
}
