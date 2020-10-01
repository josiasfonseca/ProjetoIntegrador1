import { BaseServiceService } from './base-service.service';
import { TipoUsuario } from './../model/tipo-usuario';
import { AlertModalService } from '../share/alert-modal.service';
import { AlertModalComponent } from '../share/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from '../model/usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BaseServiceService {

  static excluiuUsuario = new EventEmitter();
  bsModalRef: BsModalRef;

  url = this.urlBase + '/usuarios';

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    // private modalService: BsModalService
    private alertService: AlertModalService
    ) {
      super();
     }

  list(paginaAtual = 1, filtro: string) {
    return this.http.get<Usuario[]>(`${this.url}?page=${paginaAtual}&filtro=${filtro}`).pipe(take(1));
  }

  listAll(filtro: string) {
    return this.http.get<Usuario[]>(`${this.url}/todos?filtro=${filtro}`).pipe(take(1));
  }

  listById(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`).pipe(take(1));
  }

deleteUsuario(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(take(1));
  }

  gravarUsuario(usuario, id: number = null) {
    if (id == null) {
      return this.http.post(this.url, usuario)
      .pipe(take(1));
    } else {
      return this.http.put(`${this.url}/${id}`, JSON.stringify(usuario), this.httpOptions)
      .pipe(take(1));
    }
  }

}
