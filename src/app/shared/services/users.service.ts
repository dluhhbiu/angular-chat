import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { User } from '@shared/interfaces';

@Injectable()
export class UsersService {
  private environment = environment;

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get(`${this.environment.users_path}/${id}`).pipe(
      map((user: User) => user)
    );
  }
}
