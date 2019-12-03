import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import { AuthService } from '@shared/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.is_authenticated) {
      return true;
    }

    return new Observable((observer: Observer<boolean>) => {
      this.authService.loadCurrentUser()
        .subscribe(
          () => {
            observer.next(true);
            observer.complete();
          },
          () => {
            this.router.navigate(['/signin']);
            observer.next(false);
          }
        );
    });

  }
}
