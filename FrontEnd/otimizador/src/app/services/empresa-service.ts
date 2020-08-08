import { Empresa } from '../model/empresa';
import { AlertModalService } from '../share/alert-modal.service';
import { AlertModalComponent } from '../share/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url = 'http://localhost:8000/api/empresas';

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
      return this.http.get<Empresa[]>(this.url).pipe(take(1));
    }
}
