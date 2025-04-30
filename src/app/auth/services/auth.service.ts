import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { environment } from '@environments/environment';
import AuthUser from '../interfaces/auth-user.interface';
import { HttpResponseWithData } from '@app/core/interface/http-responses.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData = new BehaviorSubject<AuthUser | null>(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null
  );
  userData$ = this.userData.asObservable();
  private authUrl = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient) {}

  loginOrCreate(email: string): any {
    return this.http
      .post<HttpResponseWithData<AuthUser>>(`${this.authUrl}/login-or-create`, {
        email,
      })
      .pipe(
        map((res) => this.setUser(res.data as AuthUser)),
        catchError((error) => this.handleAuthError(error))
      );
  }

  setUser(authUser: AuthUser) {
    this.userData.next(authUser);
    localStorage.setItem('user', JSON.stringify(authUser));
    return this.userData;
  }

  logout() {
    this.userData.next(null);
    localStorage.removeItem('user');
  }

  checkIfAuthenticated() {
    const user = localStorage.getItem('user');

    if (!user) {
      this.logout();
      return of(false);
    }

    this.userData.next(JSON.parse(user));
    return of(true);
  }

  private handleAuthError(error: Error) {
    console.error('Auth error:', error);
    this.logout();
    return of(false);
  }
}
