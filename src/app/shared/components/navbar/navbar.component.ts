import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <div class="logo-container" (click)="navigateToDashboard()">
        <img src="assets/psymed-logo.svg" alt="PsyMed Logo" class="logo">
        <span class="brand-name">PsyMed</span>
      </div>
      <span class="spacer"></span>
      <button mat-button class="nav-button" (click)="navigateToProfile()">
        <mat-icon>account_circle</mat-icon>
        <span>Mi Perfil</span>
      </button>
      <button mat-button class="nav-button" (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>Salir</span>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      padding: 0 2rem;
      background-color: #0a192f;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .logo {
      height: 40px;
      width: auto;
    }

    .brand-name {
      font-size: 1.5rem;
      font-weight: 500;
      color: white;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .nav-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      color: white;

      mat-icon {
        margin-right: 4px;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    @media (max-width: 600px) {
      mat-toolbar {
        padding: 0 1rem;
      }

      .brand-name {
        display: none;
      }

      .nav-button span {
        display: none;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  userRole: 'medico' | 'paciente' = 'medico'; // Por defecto médico, esto debería venir de un servicio de autenticación

  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí deberíamos obtener el rol del usuario del servicio de autenticación
    // Por ahora lo determinaremos basándonos en la URL actual
    this.userRole = this.router.url.includes('medico') ? 'medico' : 'paciente';
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard', this.userRole]);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    // Aquí deberíamos llamar al servicio de autenticación para hacer logout
    this.router.navigate(['/']);
  }
}
