import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];
  public usuarios: Usuario[] = [];

  constructor(private activateRoute: ActivatedRoute,
      private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe(({termino}) => {
        this.busquedaGlobal(termino);
      })
  }

  busquedaGlobal(strBusqueda: string){
    this.busquedaService.busquedaGlobal(strBusqueda)
      .subscribe( (resp:any) => {
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      });
  }

}
