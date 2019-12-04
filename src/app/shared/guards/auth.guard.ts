import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthService } from '@shared/services';
import { User } from '@shared/interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  private environment = environment;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated) {
      return true;
    }

    return this.authService.loadCurrentUser().pipe(
      catchError(() => {
        this.router.navigate([this.environment.loginRoute]);
        return of(false);
      }),
      map((user: User) => {
        return true;
      })
    );
  }
}
