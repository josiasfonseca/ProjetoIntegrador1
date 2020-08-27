import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlertModalService } from './../share/alert-modal.service';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ImportadorService extends BaseServiceService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertModalService
  ) {
    super();
  }

  // envia arquivo do cliente
  enviarArquivoCliente(id, file: Set<File>) {
    const formData = new FormData();
    file.forEach(f => {
      formData.append('arquivo_cliente', f[0], f.name);
    });
    return this.http.post(`${this.urlBase}/importador/clientes/${id}`, formData);
  }

  enviarArquivoEscritorio(id, file: Set<File>) {
    const formData = new FormData();
    file.forEach(f => {
      formData.append('arquivo_escritorio', f[0], f.name);
    });
    return this.http.post(`${this.urlBase}/importador/clientes/${id}`, formData);
  }
}
