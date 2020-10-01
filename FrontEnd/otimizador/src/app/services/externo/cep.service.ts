import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  url = 'https://viacep.com.br/ws/';

   // Headers
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  consultaCep(cep: string) {
    return this.http.get(`${this.url}${cep}/json`);
  }
}
