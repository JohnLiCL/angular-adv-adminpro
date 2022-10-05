import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';

import { Medico } from 'src/app/models/medico.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  private imgSub: Subscription;

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];


  constructor(private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) {
    this.imgSub = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img: any) => { this.listaMedicos(); });
  }
  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }

  ngOnInit(): void {
    this.listaMedicos();
  }

  listaMedicos() {
    this.cargando = true;
    this.medicoService.readMedicos()
      .subscribe(medicos => {
        this.medicos = medicos;
        this.medicosTemp = medicos;
        this.cargando = false;
      });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(strBusqueda: string) {

    if (strBusqueda.length === 0) {
      this.cargando = false;
      this.medicos = this.medicosTemp;
      return
    }

    this.cargando = true;
    this.busquedasService.buscar('medicos', strBusqueda)
      .subscribe(resultado => {
        this.medicos = resultado as Medico[];
        this.cargando = false;
      });
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.deleteMedico(medico._id)
          .subscribe(reps => {
            this.listaMedicos();
            Swal.fire('Eliminado', medico.nombre, 'success');
          });
      }
    })
  }

}
