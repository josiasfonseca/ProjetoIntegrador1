import { BaseServiceService } from './base-service.service';
import { take } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TipoUsuario } from './../model/tipo-usuario';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService extends BaseServiceService {

  url = this.urlBase + '/tipos_usuarios';

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    ) {
      super();
     }

    list() {
      return this.http.get<TipoUsuario[]>(this.url).pipe(take(1));
    }

}
