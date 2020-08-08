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

  list() {
    return this.http.get<Controle[]>(this.url).pipe(take(1));
  }
}
