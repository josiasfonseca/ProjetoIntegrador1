import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TipoUsuario } from './../model/tipo-usuario';
import { AlertModalService } from './../share/alert-modal.service';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  url = 'http://localhost:8000/api/tipos_usuarios';

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertModalService
    ) { }

    list() {
      return this.http.get<TipoUsuario[]>(this.url).pipe(take(1));
    }

}
