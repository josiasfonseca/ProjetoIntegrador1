import { BaseServiceService } from './base-service.service';
import { Controle } from 'src/app/model/controle';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlertModalService } from './../share/alert-modal.service';

@Injectable({
  providedIn: 'root'
})
export class ControleService extends BaseServiceService {

  url = this.urlBase + '/controles';
  controle: Controle;

   // Headers
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertModalService
  ) {
    super();
  }

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
