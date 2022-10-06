import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Thema' } },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { title: 'Busqueda del Sistema' } },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica #1' } },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Configuracion de Cuenta' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progressbar' } },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },

      //Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenedor de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenedor de Médicos' } },
      { path: 'medicos/:id', component: MedicoComponent, data: { title: 'Mantenedor de Médico' } },
      //Rutas Admin 
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { title: 'Usuarios de aplicación' } },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
