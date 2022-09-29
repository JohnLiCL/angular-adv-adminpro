import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['John', Validators.required],
    apellido: ['Li', Validators.required],
    email: ['john.s@test.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required]
  }, {
    Validators: this.passIguales('password', 'password2')
  }

  );

  constructor(private router: Router, 
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

  crearUsuario(): void {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;

    }
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        console.log('Usuario Creado');
        console.log(resp);
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        //Si Sucede un error
        Swal.fire('Error',err.error.msg,'error');
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = this.registerForm.get('password');
      const pass2Control = this.registerForm.get('password2');
      if (pass1Control && pass2Control) {
        pass2Control.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }

  verificaTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

}
