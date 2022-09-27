import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.googleInit();
  }

  async googleInit() {
    await this.usuarioService.googleInit();
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large", text: "signin_with",shape: "pill" }  // customization attributes
    );
  }

  login() {

    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        //Navega al Dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        //Si Sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
    //console.log(this.loginForm.value);


  }

}
