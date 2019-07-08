import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';


import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {RoutesService} from '../routes.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private rs: RoutesService) {
  }


  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.auth.getUserAccount$().map(user => !!user && user.emailVerified)
      .do((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate([this.rs.byName('login')]);
        }
      });

  }
}
