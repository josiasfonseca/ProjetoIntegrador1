import { BaseServiceService } from './base-service.service';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService extends BaseServiceService {

  url = this.urlBase + '/logs';

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    ) {
      super();
     }

  list(paginaAtual = 1, filtro: string) {
    return this.http.get<any[]>(`${this.url}/logs?page=${paginaAtual}&filtro=${filtro}`).pipe(take(1));
  }

}
