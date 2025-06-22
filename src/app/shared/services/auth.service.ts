import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

interface User {
  id: number;
  username: string;
  role: 'doctor' | 'patient';
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = {
    id: 1,
    username: 'jhomar.ast',
    role: 'doctor',
    firstName: 'Jhomar',
    lastName: 'Ast',
    email: 'jhomar.ast@spymed.com',
    profileImage: 'assets/doctor-profile.jpg'
  };

  constructor(private router: Router) {}

  login(username: string, password: string): Observable<User> {
    // Simulamos login exitoso
    this.currentUser = {
      id: 1,
      username: 'jhomar.ast',
      role: 'doctor',
      firstName: 'Jhomar',
      lastName: 'Ast',
      email: 'jhomar.ast@spymed.com',
      profileImage: 'assets/doctor-profile.jpg'
    };
    return of(this.currentUser);
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }
}
