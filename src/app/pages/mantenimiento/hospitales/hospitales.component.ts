import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.models';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit, OnDestroy {

  private imgSub: Subscription;

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public totalHospitales: number = 0;

  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) {

    this.imgSub = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img: any) => { this.listaHospitales(); });
  }
  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }

  ngOnInit(): void {
    this.listaHospitales();
  }

  listaHospitales() {
    this.cargando = true;
    this.hospitalService.readHospitales()
      .subscribe((hospitales) => {
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
        this.totalHospitales = hospitales.length;
        this.cargando = false;
      });
  }
  guardarHospital(hospital: Hospital) {

    this.hospitalService.updateHospital(hospital._id, hospital.nombre)
      .subscribe(reps => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Borrar Hopital?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital._id)
          .subscribe(reps => {
            this.listaHospitales();
            Swal.fire('Eliminado', hospital.nombre, 'success');
          });
      }
    })
  }

  async crearHospital() {
    const { value } = await Swal.fire({
      title: 'Crear Hospital',
      confirmButtonText: 'Crear',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    })

    if (value?.trim().length > 0) {
      this.hospitalService.createHospital(value)
        .subscribe(resp => {
          this.listaHospitales();
          Swal.fire('Creado', value, 'success');
          console.log(resp);

        });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(strBusqueda: string) {

    if (strBusqueda.length === 0) {
      this.cargando = false;
      this.hospitales = this.hospitalesTemp;
      return
    }

    this.cargando = true;
    this.busquedasService.buscar('hospitales', strBusqueda)
      .subscribe(resultado => {
        this.hospitales = resultado as Hospital[];
        this.totalHospitales = this.hospitales.length;
        this.cargando = false;
      });
  }


}
