import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  private readonly userSubject = new BehaviorSubject<any | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user == undefined) {
      this.logout();
    }
    this.tokenSubject.next(token);
    this.userSubject.next(user);
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string; user: User }>(
      `${environment.apiUrl}/login`,
      {
        username,
        password,
      }
    );
  }

  setToken(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.tokenSubject.next(token);
    this.userSubject.next(user);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserFromLocalStorage(): User | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.tokenSubject.next(null);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  signUp(user: any) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }
}
