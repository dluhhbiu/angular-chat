import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@shared/interfaces';

@Injectable()
export class UsersService {
  private apiPath = '/api/users';

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      map((user: User) => user)
    );
  }
}
