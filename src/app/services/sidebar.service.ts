import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gaude',
      subMenu: [
        { titulo: 'Dashboard', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Gráfica', url: 'grafica1' },
      ]
    }
  ];

  constructor() { }
}
