import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '@env/environment';
import { User, Auth } from '@shared/interfaces';
import { UsersService } from '@shared/services/users.service';

@Injectable()
export class AuthService {
  private currentTokenSubject: BehaviorSubject<string>;
  private user: User;
  private environment = environment;

  constructor(
    private http: HttpClient,
    private router: Router,
    private usersService: UsersService,
    private jwtHelperService: JwtHelperService,
  ) {
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('access_token'));
  }

  get isAuthenticated(): boolean {
    const token = this.currentTokenSubject.value;
    const userId = token && this.jwtHelperService.decodeToken(token).sub;

    return !!token && !!this.user && userId === this.user.id;
  }

  get currentUser(): User {
    return this.user;
  }

  loadCurrentUser(): Observable<User> {
    const token = this.currentTokenSubject.value;
    const userId = token && this.jwtHelperService.decodeToken(token).sub;

    if (!userId) {
      return throwError('error');
    }

    return this.usersService.getUser(userId).pipe(
      tap((user: User) => (this.user = user)));
  }

  login(data: Auth): Observable<void> {
    return this.authRequest(this.environment.signinPath, data);
  }

  registration(data: Auth): Observable<void> {
    return this.authRequest(this.environment.signupPath, data);
  }

  private authRequest(url: string, data: Auth): Observable<void> {
    return this.http.post(url, data)
      .pipe(tap((body: any) => {
        const token = body && body.accessToken;

        if (token) {
          localStorage.setItem('access_token', token);
          this.currentTokenSubject.next(token);
          this.router.navigate([this.environment.defaultRoute]);
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentTokenSubject.next(null);
    this.user = null;
    this.router.navigate([this.environment.loginRoute]);
  }
}
