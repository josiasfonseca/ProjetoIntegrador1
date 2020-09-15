import { Usuario } from 'src/app/model/usuario';
import { Router } from '@angular/router';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseServiceService {

  constructor(private http: HttpClient, private router: Router) {
    super();
   }

   check(): boolean {
    return localStorage.getItem('user') ? true : false;
   }

  login(credentials: {login: string, password: string}): Observable<boolean> {
    return this.http.post<any>(`${this.urlBase}/auth/login/`, credentials)
    .pipe(
      tap(
        (data) => {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
        }
        )
        );
      }

      logout() {
        return this.http.get(`${this.urlBase}/auth/logout`)
        .subscribe((resp: any) => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('resultConfrontoClientes');
          localStorage.removeItem('resultConfrontoFornecedores');
          this.router.navigate(['/login']);
        });
      }

      getUser(): Usuario {
        return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
      }

      setUser(): Promise<boolean> {
        return this.http.get(`${this.urlBase}/me`).toPromise()
        .then((data: any) => {
          if (data.user) {
            localStorage.setItem('user', btoa(JSON.stringify(data.user)));
            return true;
          }
          return false;
    });
  }
}
