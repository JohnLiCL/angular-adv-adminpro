import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico | undefined;
  public hospitalSeleccionado: Hospital | undefined;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.listaHospitales();

    this.activateRoute.params.subscribe(({ id }) => this.cargaMedico(id));

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
      })

  }

  cargaMedico(id: string) {

    if (id === 'nuevo') { return; }

    this.medicoService.getMedico(id)
      .pipe(
        delay(100)
      )
      .subscribe((medico: any) => {
        //if (!medico) { return this.router.navigateByUrl(`/dashboard/medicos`); }
        const { nombre, hospital: { _id } } = medico
        this.medicoSeleccionado = medico
        this.medicoForm.setValue({ nombre: nombre, hospital: _id })
      }, (error) => {
        return this.router.navigateByUrl(`/dashboard/medicos`);
      })
  }


  listaHospitales() {
    this.hospitalService.readHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      //Actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.updateMedico(data)
        .subscribe((resp: any) => {
          Swal.fire('Actualizado',
            `Medico ${nombre} Actualizado con exito`,
            'success');
        });
    } else {
      //Crear
      this.medicoService.createMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Guardar',
            `Medico ${nombre} Creado con exito`,
            'success');
          this.router.navigateByUrl(`/dashboard/medicos/${resp.medico._id}`);
        });
    }


  }
}
