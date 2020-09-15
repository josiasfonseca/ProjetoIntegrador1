import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean |
     import('@angular/router').UrlTree |
     import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
      | Promise<boolean | import('@angular/router').UrlTree> {
        if (this.auth.check()) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean |
     import('@angular/router').UrlTree |
     import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
      | Promise<boolean | import('@angular/router').UrlTree> {
        if (this.auth.check()) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
  }
}
