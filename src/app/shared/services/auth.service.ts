import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '@shared/interfaces';
import { UsersService } from '@shared/services/users.service';

@Injectable()
export class AuthService {
  private apiPath = '/api/login';
  private currentTokenSubject: BehaviorSubject<string>;
  private user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private usersService: UsersService,
    private jwtHelperService: JwtHelperService,
  ) {
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('access_token'));
  }

  get is_authenticated(): boolean {
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
      map((user: User) => {
        this.user = user;
        return user;
      }));
  }

  login(data: { email: string, password: string }): Observable<void> {
    return this.http.post(this.apiPath, data)
      .pipe(map((body: any) => {
        const token = body && body.accessToken;

        if (token) {
          localStorage.setItem('access_token', token);
          this.currentTokenSubject.next(token);
          this.router.navigate(['/chats']);
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentTokenSubject.next(null);
    this.user = null;
    this.router.navigate(['/signin']);
  }
}
