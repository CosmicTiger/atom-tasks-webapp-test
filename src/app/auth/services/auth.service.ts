import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentAppConfig } from '../../app.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userEmail = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmail.asObservable();
  private authUrl = `${environmentAppConfig}/users`;

  constructor(private http: HttpClient) {}

  loginOrCreate(email: string) {
    return this.http.post(`${this.authUrl}/login-or-create`, { email });
  }

  setUser(email: string) {
    this.userEmail.next(email);
  }

  logout() {
    this.userEmail.next(null);
  }
}
