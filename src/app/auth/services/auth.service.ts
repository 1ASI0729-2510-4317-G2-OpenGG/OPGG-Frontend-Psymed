import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, AuthResponse } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    // For development, using mock data
    // In production, this would call your real API
    const userRole: 'doctor' | 'patient' = username === 'doctor' ? 'doctor' : 'patient';

    const user: User = {
      id: username === 'doctor' ? 1 : 2,
      username,
      password: '',
      role: userRole,
      email: `${username}@example.com`,
      firstName: username === 'doctor' ? 'John' : 'Jane',
      lastName: username === 'doctor' ? 'Smith' : 'Doe'
    };

    return of(user).pipe(
      tap(user => {
        // Store user details and token in local storage
        const authResponse: AuthResponse = {
          user,
          token: 'fake-jwt-token'
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', 'fake-jwt-token');
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError(error => {
        return throwError(() => new Error('Invalid credentials'));
      })
    );
  }

  logout() {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    return this.currentUserValue?.role === role;
  }
}
