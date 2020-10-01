import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private estados = [
    { nome: 'AC'},
    { nome: 'AL'},
    { nome: 'AP'},
    { nome: 'AM'},
    { nome: 'BA'},
    { nome: 'CE'},
    { nome: 'DF'},
    { nome: 'ES'},
    { nome: 'GO'},
    { nome: 'MA'},
    { nome: 'MT'},
    { nome: 'MS'},
    { nome: 'MG'},
    { nome: 'PA'},
    { nome: 'PB'},
    { nome: 'PR'},
    { nome: 'PE'},
    { nome: 'PI'},
    { nome: 'RJ'},
    { nome: 'RN'},
    { nome: 'RS'},
    { nome: 'RO'},
    { nome: 'RR'},
    { nome: 'SC'},
    { nome: 'SP'},
    { nome: 'SE'},
    { nome: 'TO'},
  ];
  constructor() { }

    getEstados() {
      return this.estados;
    }
}
