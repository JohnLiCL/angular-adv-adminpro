import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      subMenu: [
        { titulo: 'Dashboard', url: '/' },
        { titulo: 'Gráfica', url: 'grafica1' },
        { titulo: 'Rxjs', url: 'rxjs' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Promesas', url: 'promesas' },
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      subMenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Médicos', url: 'medicos' },
      ]
    }
  ];

  constructor() { }
}
