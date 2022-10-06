import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
      private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    //console.log('*****AdminGuard ', this.usuarioService.role);
    if (this.usuarioService.role === 'ADMIN_ROL'){
      return true;
    }else{
      this.router.navigateByUrl('/no-autorizado',);
      return false;
    }
  }

}
