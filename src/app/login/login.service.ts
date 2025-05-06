import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './models/user.model';
import { AppConstants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, user);
  }
  login(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, user).pipe(
      tap(response => {
        localStorage.setItem(AppConstants.TOKEN_KEY, response.token!);
      }),
      catchError(error => {
        return throwError(() => error);
      }));
  }
}
