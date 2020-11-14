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

  // listar layouts de pagamento de uma empresa
  listaLayoutPagamentos(idEmpresa: number) {
    return this.http.get<LayoutPagamento[]>(`${this.url}/layouts-pagamentos/${idEmpresa}`);
  }
  // listar um layout por id
  listaLayoutPagamento(idLayoutPagamento: number) {
    return this.http.get<LayoutPagamento[]>(`${this.url}/layouts-pagamento/${idLayoutPagamento}`);
  }

  // Gravar layout de pagamento
  gravarLayoutPagamento(idLayoutPagamento, dados) {
    if (idLayoutPagamento) {
      return this.http.put(`${this.url}/layouts-pagamento/${idLayoutPagamento}`, dados);
    } else {
      return this.http.post(`${this.url}/layouts-pagamento/incluir`, dados);
    }
  }
}
