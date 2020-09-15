import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
      const url: Array<any> = request.url.split('/');

      const apiUrl = 'localhost:8000';
      const token = localStorage.getItem('token');
      if (token && (url[2] === apiUrl)) {
        const newRequest = request.clone({ setHeaders: { Authorization : `Bearer ${token}`} });
        return next.handle(newRequest);
      } else {
        return next.handle(request);
      }
  }
}
