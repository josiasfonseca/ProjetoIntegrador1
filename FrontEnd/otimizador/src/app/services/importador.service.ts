import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlertModalService } from './../share/alert-modal.service';
import { BaseServiceService } from './base-service.service';
import { Observable } from 'rxjs';

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

  // ARQUIVOS FORNECEDORES
  enviarArquivoFornecedor(idEmpresa, idLayout, file: Set<File>) {
    const formData = new FormData();
    file.forEach(f => {
      formData.append('arquivo_fornecedor', f[0], f.name);
    });
    return this.http.post(`${this.urlBase}/importador/fornecedores/${idEmpresa}/${idLayout}`, formData);
  }

  enviarArquivoFornecedorEscritorio(id, file: Set<File>) {
    const formData = new FormData();
    file.forEach(f => {
      formData.append('arquivo_fornecedor_escritorio', f[0], f.name);
    });
    return this.http.post(`${this.urlBase}/importador/fornecedores/${id}/1`, formData);
  }

  confrontarFornecedores(idEmpresa) {
    return this.http.get(`${this.urlBase}/importador/fornecedores/confrontar/${idEmpresa}`);
  }

  baixarFornecedoresComErro(idEmpresa: number, extensao: string): Observable<any> {
    return this.http.get(
      `${this.urlBase}/importador/fornecedores/download-fornecedores-com-erro/${idEmpresa}/${extensao}`, {
        responseType: 'blob' as 'json'
      });
  }

  gerarArquivoContabilidade(idEmpresa: number) {
    return this.http.get(`${this.urlBase}/importador/fornecedores/gerarArquivoContabilidade/${idEmpresa}`);
  }

  baixarFornecedoresContabilidade(idEmpresa: number, extensao: string): Observable<any> {
    return this.http.get(
      `${this.urlBase}/importador/fornecedores/download-fornecedores-contabilidade/${idEmpresa}/${extensao}`, {
        responseType: 'blob' as 'json'
      });
  }

  // ARQUIVOS CLIENTES
  enviarArquivoCliente(id, file: Set<File>) {
    const formData = new FormData();
    file.forEach(f => {
      formData.append('arquivo_cliente', f[0], f.name);
    });
    return this.http.post(`${this.urlBase}/importador/clientes/${id}`, formData);
  }

  enviarArquivoClienteEscritorio(id, file: Set<File>) {
    const formData = new FormData();
    file.forEach(f => {
      formData.append('arquivo_escritorio', f[0], f.name);
    });
    return this.http.post(`${this.urlBase}/importador/clientes/${id}`, formData);
  }

    confrontarClientes(idEmpresa: number) {
      return this.http.get(`${this.urlBase}/importador/clientes/confrontar/${idEmpresa}`);
    }

    baixarClientesComErro(idEmpresa: number, extensao: string): Observable<any> {
      return this.http.get(
        `${this.urlBase}/importador/clientes/download-clientes-com-erro/${idEmpresa}/${extensao}`, {
          responseType: 'blob' as 'json'
        });
      }

  gerarArquivoContabilidadeClientes(idEmpresa: number) {
    return this.http.get(`${this.urlBase}/importador/clientes/gerarArquivoContabilidade/${idEmpresa}`);
  }

  baixarClientesContabilidade(idEmpresa: number, extensao: string): Observable<any> {
    return this.http.get(
      `${this.urlBase}/importador/clientes/download-clientes-contabilidade/${idEmpresa}/${extensao}`, {
        responseType: 'blob' as 'json'
      });
    }

    // ARQUIVOS CARTAO
    enviarArquivoCartao(id, file: Set<File>) {
      const formData = new FormData();
      file.forEach(f => {
        formData.append('arquivo_cartao', f[0], f.name);
      });
      return this.http.post(`${this.urlBase}/importador/cartoes/${id}`, formData);
  }

  enviarArquivoCartaoEscritorio(id, file: Set<File>) {
    const formData = new FormData();
    file.forEach(f => {
      formData.append('arquivo_cartao_escritorio', f[0], f.name);
    });
    return this.http.post(`${this.urlBase}/importador/cartoes/${id}`, formData);
  }

  gerarArquivoCartaoContabilidade(idEmpresa: number) {
    return this.http.get(`${this.urlBase}/importador/cartoes/gerarArquivoContabilidade/${idEmpresa}`);
  }

  baixarCartoesContabilidade(idEmpresa: number, extensao: string) {
    return this.http.get(
      `${this.urlBase}/importador/cartoes/download-cartao/${idEmpresa}/${extensao}`, {
        responseType: 'blob' as 'json'
      });
  }

  handleFile(res, fileName: string) {

    const file = new Blob([res], {
      type: res.type
    });

    // IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    // link.click();
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    setTimeout(() => { // firefox
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 150);
  }
}
