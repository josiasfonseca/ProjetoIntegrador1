import { BaseServiceService } from './base-service.service';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Empresa } from '../model/empresa';
import { AlertModalService } from '../share/alert-modal.service';
import { AlertModalComponent } from '../share/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends BaseServiceService {

  url = this.urlBase + '/empresas';

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

    list(paginaAtual = 1, filtro: string) {
      return this.http.get<Empresa[]>(`${this.url}?page=${paginaAtual}&filtro=${filtro}`).pipe(take(1));
    }

    listPorId(id: number) {
      return this.http.get<Empresa>(`${this.url}/${id}`).pipe(take(1));
    }

    deleteEmpresa(id: number) {
      return this.http.delete(`${this.url}/${id}`).pipe(take(1));
    }

    gravarEmpresa(empresa: Empresa, id: number) {
      if (id == null) {
        return this.http.post(this.url, empresa)
        .pipe(take(1));
      } else {
        return this.http.put(`${this.url}/${id}`, JSON.stringify(empresa), this.httpOptions)
        .pipe(take(1));
      }
    }
}
