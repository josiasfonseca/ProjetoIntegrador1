import { Usuario } from 'src/app/model/usuario';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-navbar',
  templateUrl: './menu-navbar.component.html',
  styleUrls: ['./menu-navbar.component.scss']
})
export class MenuNavbarComponent implements OnInit {

  usuario: Usuario;
  usuarioLogado: Usuario;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usuario = this.authService.getUser();

    this.usuarioLogado = JSON.parse(atob(localStorage.getItem('user')));

  }

  logout(e) {
    e.preventDefault();
    this.authService.logout();
  }
}
