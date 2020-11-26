import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  // urlBase = 'https://otimizador.rodacutiastore.com.br/api';
  urlBase = 'http://localhost:8000/api';

   // Headers
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor() { }
}
