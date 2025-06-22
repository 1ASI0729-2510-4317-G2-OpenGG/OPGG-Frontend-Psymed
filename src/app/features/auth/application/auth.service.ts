import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginCredentials, User } from '../domain/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(credentials: LoginCredentials): Observable<User> {
    // Mock login - replace with actual API call
    return of({
      id: '1',
      email: credentials.username,
      username: credentials.username,
      token: 'mock-jwt-token'
    }).pipe(delay(1000)); // Simulate API delay
  }

  logout(): Observable<void> {
    // Mock logout - replace with actual API call
    return of(void 0).pipe(delay(500));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
