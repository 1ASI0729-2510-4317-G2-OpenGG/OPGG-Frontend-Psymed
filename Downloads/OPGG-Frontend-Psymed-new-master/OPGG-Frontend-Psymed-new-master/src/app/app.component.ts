import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'medical-appointments';
  showNavbar = false;
  currentUser: any = null;
  userType: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Escuchar cambios de ruta para mostrar/ocultar navbar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateNavbarVisibility(event.url);
      });

    // Verificar estado inicial
    this.updateNavbarVisibility(this.router.url);
  }

  private updateNavbarVisibility(url: string): void {
    this.showNavbar = !url.includes('/auth/login');

    if (this.showNavbar) {
      this.loadCurrentUser();
    }
  }

  private loadCurrentUser(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.userType = this.currentUser.userType;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.userType = '';
    this.router.navigate(['/auth/login']);
  }

  // Métodos para verificar tipo de usuario
  isPatient(): boolean {
    return this.userType === 'patient';
  }

  isMedic(): boolean {
    return this.userType === 'medic';
  }

  isAdmin(): boolean {
    return this.userType === 'admin';
  }
}
