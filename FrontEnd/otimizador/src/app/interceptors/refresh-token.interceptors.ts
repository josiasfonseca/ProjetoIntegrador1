import { AlertModalService } from './../share/alert-modal.service';
import { flatMap, catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private http: Injector,
    private router: Router,
    private alert: AlertModalService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const error = (typeof  errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse;
        console.error('erro', error);
        if (errorResponse.status === 401 && error.error.status === 'token_expired') {
          const http = this.http.get(HttpClient);
          return http.post<any>('http://localhost:8000/api/auth/refresh', {})
          .pipe(
            flatMap((data: any) => {
              localStorage.setItem('token', data.token);
              const cloneRequest = request.clone({setHeaders: { Authorization : `Bearer ${data.token}`}});
              return next.handle(cloneRequest);
            })
            );
        } else if (errorResponse.status === 401 && error.error.status === 'token_expired_time') {
            console.log('Arrrrr');
        } else if (errorResponse.status === 500 && error.error.message === 'Token has expired and can no longer be refreshed') {
            this.alert.closeAlert();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.clear();
            this.router.navigate(['/']);
        }
        return throwError(errorResponse);
      })
    );
  }
}
