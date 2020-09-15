import { flatMap, catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private http: Injector,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const error = (typeof  errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse;
        if (errorResponse.status === 401 && error.error.status === 'token_expired') {
          const http = this.http.get(HttpClient);
          console.log(errorResponse);
          return http.post<any>('http://localhost:8000/api/auth/refresh', {})
          .pipe(
            flatMap((data: any) => {
              localStorage.setItem('token', data.token);
              const cloneRequest = request.clone({setHeaders: { Authorization : `Bearer ${data.token}`}});
              return next.handle(cloneRequest);
            })
            );
        } else if (errorResponse.status === 401 && error.error.status === 'token_expired_time') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.router.navigate(['/']);
        }
        return Observable.throw(errorResponse);
      })
    );
  }
}
