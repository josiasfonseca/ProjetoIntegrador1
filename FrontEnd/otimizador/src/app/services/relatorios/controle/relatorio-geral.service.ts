import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Empresa } from '../../../model/empresa';
import { AlertModalService } from '../../../share/alert-modal.service';
import { AlertModalComponent } from '../../../share/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class RelatorioGeralService {

  url = 'http://localhost:8000/api/relatorios/controle';

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertModalService
    ) { }

    listaGeral(page: number, filtro: string) {
      return this.http.get<any>(`${this.url}/relatorio-geral?page=${page}&filtro=${filtro}`);
    }
}
