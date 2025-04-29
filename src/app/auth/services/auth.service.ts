import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';
import AuthUser from '../interfaces/auth-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData = new BehaviorSubject<AuthUser | null>(null);
  userEmail$ = this.userData.asObservable();
  private authUrl = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient) {}

  loginOrCreate(email: string): any {
    return this.http.post(`${this.authUrl}/login-or-create`, { email });
  }

  setUser(authUser: AuthUser) {
    this.userData.next(authUser);
  }

  logout() {
    this.userData.next(null);
  }
}
