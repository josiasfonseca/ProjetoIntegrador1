import { LayoutRecebimento } from './../model/layout-recebimento';
import { LayoutPagamento } from './../model/layout-pagamento';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from './base-service.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

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
  gravarLayoutPagamento(idLayoutPagamento, idEmpresa, dados) {
    if (idLayoutPagamento) {
      return this.http.put(`${this.url}/layouts-pagamento/${idLayoutPagamento}`, dados);
    } else if (idEmpresa) {
      return this.http.post(`${this.url}/layouts-pagamento/${idEmpresa}`, dados);
    }
  }

  // listar layouts de recebimento de uma empresa
  listaLayoutRecebimentos(idEmpresa: number) {
    return this.http.get<LayoutRecebimento[]>(`${this.url}/layouts-recebimentos/${idEmpresa}`);
  }

  // listar um layout por id
  listaLayoutRecebimento(idLayoutRecebimento: number) {
    return this.http.get<LayoutRecebimento[]>(`${this.url}/layouts-recebimento/${idLayoutRecebimento}`);
  }

  // Gravar layout de recebimento
  gravarLayoutRecebimento(idLayoutRecebimento, idEmpresa, dados) {
    if (idLayoutRecebimento) {
      return this.http.put(`${this.url}/layouts-recebimento/${idLayoutRecebimento}`, dados);
    } else if (idEmpresa) {
      return this.http.post(`${this.url}/layouts-recebimento/${idEmpresa}`, dados);
    }
  }
}
