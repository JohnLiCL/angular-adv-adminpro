import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSub: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;


  constructor(private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService) {
    
      this.imgSub = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img: any) => { this.listaUsuarios(); });
  }

  ngOnInit(): void {
    this.listaUsuarios();
  }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }

  listaUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiaPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.listaUsuarios();
  }

  buscar(strBusqueda: string) {
    if (strBusqueda.length === 0) {
      this.cargando = false;
      this.usuarios = this.usuariosTemp;
      return
    }
    this.cargando = true;
    this.busquedasService.buscar('usuarios', strBusqueda)
      .subscribe(resultados => {
        this.usuarios = resultados;
        this.totalUsuarios = this.usuarios.length;
        this.cargando = false;
      });
  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(usuario)
          .subscribe(resp => {
            Swal.fire(
              'Eliminado!',
              `El Usuario ${usuario.nombre} ha sido Eliminado Correctamente.`,
              'success'
            );
            this.listaUsuarios();
          });
      }
    })
  }

  cambiarRol(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        //console.log(resp);
      });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
