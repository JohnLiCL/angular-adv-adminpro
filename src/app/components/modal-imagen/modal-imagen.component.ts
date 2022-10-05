import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})

export class ModalImagenComponent implements OnInit {

  @ViewChild('inputImg') inputImg: ElementRef | undefined;

  public imagenUpload!: File;
  public imgTemp: any = null;


  constructor(public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService,
    public usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.imgTemp = null;
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiaImagen(file: any): any {
    if (!file) {
      this.imagenUpload = file;
      return this.imgTemp = null;
    } else {
      this.imagenUpload = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }
  }


  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .updateImage(this.imagenUpload, tipo, id)
      .then(img => {
        Swal.fire('Exito', 'Imagen cambiada con exito!!!', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      });
  }

}
