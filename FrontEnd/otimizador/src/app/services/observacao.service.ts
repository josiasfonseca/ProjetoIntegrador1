import { Observacao } from './../model/observacao';

import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AlertModalService } from '../share/alert-modal.service';
import { AlertModalComponent } from '../share/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ObservacaoService {

  url = 'http://localhost:8000/api/observacoes';

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
      return this.http.get<Observacao[]>(this.url).pipe(take(1));
    }

    listPorId(id: number) {
      return this.http.get<Observacao>(`${this.url}/${id}`).pipe(take(1));
    }

    listPorControle(id: number) {
      return this.http.get<Observacao>(`${this.url}/${id}`).pipe(take(1));
    }
}
