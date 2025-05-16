import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

interface AuthUser {
  id: number;
  email: string;
  role: 'doctor' | 'patient';
  name: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthUser | null>;
  public currentUser: Observable<AuthUser | null>;

  constructor(private apiService: ApiService) {
    const savedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<AuthUser | null>(savedUser ? JSON.parse(savedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const user = this.currentUserValue;
    return !!user && !!user.token;
  }

  async login(email: string, password: string): Promise<AuthUser> {
    // TODO: Implement actual login with API
    const mockUser: AuthUser = {
      id: 1,
      email: email,
      role: 'doctor',
      name: 'Dr. John Doe',
      token: 'mock-jwt-token'
    };

    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    this.currentUserSubject.next(mockUser);
    return mockUser;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'doctor' | 'patient';
  }): Promise<AuthUser> {
    // TODO: Implement actual registration with API
    const mockUser: AuthUser = {
      id: 1,
      email: userData.email,
      role: userData.role,
      name: `${userData.firstName} ${userData.lastName}`,
      token: 'mock-jwt-token'
    };

    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    this.currentUserSubject.next(mockUser);
    return mockUser;
  }

  async resetPassword(email: string): Promise<boolean> {
    // TODO: Implement actual password reset with API
    console.log('Password reset requested for:', email);
    return true;
  }

  async verifyResetCode(email: string, code: string): Promise<boolean> {
    // TODO: Implement actual code verification with API
    console.log('Verifying reset code:', code, 'for email:', email);
    return true;
  }

  async setNewPassword(email: string, code: string, newPassword: string): Promise<boolean> {
    // TODO: Implement actual password update with API
    console.log('Setting new password for:', email);
    return true;
  }
}
