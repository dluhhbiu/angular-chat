import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private apiPath = '/api/login';
  private currentTokenSubject: BehaviorSubject<string>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentTokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentToken')));
  }

  get authenticated(): boolean {
    return !!this.currentTokenValue;
  }

  get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  login(data: { email: string, password: string }): Observable<void> {
    return this.http.post(this.apiPath, data)
      .pipe(map((body: any) => {
        const token = body && body.accessToken;

        if (token) {
          localStorage.setItem('currentToken', JSON.stringify(token));
          this.currentTokenSubject.next(token);

          this.router.navigate(['/chats']);
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('currentToken');
    this.currentTokenSubject.next(null);
    this.router.navigate(['/']);
  }
}
