import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlertModalService } from './../share/alert-modal.service';
import { Controle } from './../model/controle';

@Injectable({
  providedIn: 'root'
})
export class ControleService {

  url = 'http://localhost:8000/api/controles';

   // Headers
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertModalService
  ) { }

  // @param id da empresa
  listaPorEmpresa(id: number) {
    return this.http.get<Controle[]>(`${this.url}/${id}`).pipe(take(1));
  }

  // @param id do controle
  listaControle(id: number) {
    return this.http.get<Controle[]>(`${this.url}/${id}/editar`).pipe(take(1));
  }

  gravar(controle, idControle: number = null) {
    if (idControle == null) {
      return this.http.post(`${this.url}/incluir`, controle)
      .pipe(take(1));
    } else {
      return this.http.put(`${this.url}/${idControle}`, JSON.stringify(controle), this.httpOptions)
      .pipe(take(1));
    }
  }
}
