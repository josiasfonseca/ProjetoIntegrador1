import { LayoutPagamento } from './../model/layout-pagamento';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from './base-service.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LayoutService extends BaseServiceService {

  url = this.urlBase + '/layouts';
  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  listaLayoutPagamentos(idEmpresa: number) {
    return this.http.get<LayoutPagamento[]>(`${this.url}/layouts-pagamentos/${idEmpresa}`);
  }

  listaLayoutPagamento(idLayoutPagamento: number) {
    return this.http.get<LayoutPagamento[]>(`${this.url}/layouts-pagamento/${idLayoutPagamento}`);
  }
}
