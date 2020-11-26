import { AuthService } from './../../../services/auth.service';
import { Usuario } from './../../../model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {

  usuario: Usuario;
  usuarioLogado: Usuario;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usuario = this.authService.getUser();

    this.usuarioLogado = JSON.parse(atob(localStorage.getItem('user')));

  }

}
