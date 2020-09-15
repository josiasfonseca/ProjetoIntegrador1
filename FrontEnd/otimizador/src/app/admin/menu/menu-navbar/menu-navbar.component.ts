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
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usuario = this.authService.getUser();
  }

  logout(e) {
    e.preventDefault();
    this.authService.logout();
  }
}
