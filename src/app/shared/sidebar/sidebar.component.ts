import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

 declare let $ : any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  menuItems: any[];

  public usuario: Usuario;

  constructor(private sidebarService: SidebarService,
      private usuarioService: UsuarioService) { 
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
      
    //console.log(this.menuItems);
  }
  ngAfterViewInit(): void {
    $('#sidebarnav').AdminMenu();
  }

  ngOnInit(): void {
  }

}
