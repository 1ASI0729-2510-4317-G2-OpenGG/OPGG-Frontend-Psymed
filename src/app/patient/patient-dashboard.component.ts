import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <header>
        <h1>SPYMED - Dashboard Paciente</h1>
        <div class="user-info">
          <button class="profile-btn" (click)="goToProfile()">
            <span class="material-icons">account_circle</span>
            {{ patientName }}
          </button>
          <button (click)="logout()" class="logout-btn">
            <span class="material-icons">exit_to_app</span> Cerrar sesión
          </button>
        </div>
      </header>

      <nav class="navigation">
        <a routerLink="home" routerLinkActive="active">
          <span class="material-icons">home</span>
          Inicio
        </a>
        <a routerLink="mood-state" routerLinkActive="active">
          <span class="material-icons">mood</span>
          Estado de Ánimo
        </a>
        <a routerLink="biological-functions" routerLinkActive="active">
          <span class="material-icons">monitor_heart</span>
          Funciones Biológicas
        </a>
        <a routerLink="daily-test" routerLinkActive="active">
          <span class="material-icons">assignment</span>
          Test Diario
        </a>
      </nav>

      <div class="dashboard-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      font-family: 'Roboto', sans-serif;
      min-height: 100vh;
      background-color: #f5f5f5;
      display: grid;
      grid-template-rows: auto auto 1fr;
    }

    header {
      background-color: #3f51b5;
      color: white;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h1 {
      margin: 0;
      font-size: 24px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .profile-btn {
      background: none;
      border: none;
      color: white;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .profile-btn:hover {
      background-color: rgba(255,255,255,0.1);
    }

    .logout-btn {
      background-color: rgba(255,255,255,0.1);
      border: none;
      color: white;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .logout-btn:hover {
      background-color: rgba(255,255,255,0.2);
    }

    .navigation {
      background-color: white;
      padding: 8px 24px;
      display: flex;
      gap: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .navigation a {
      color: #666;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s;
    }

    .navigation a:hover {
      background-color: #f5f5f5;
      color: #3f51b5;
    }

    .navigation a.active {
      background-color: #e8eaf6;
      color: #3f51b5;
    }

    .dashboard-content {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
  `]
})
export class PatientDashboardComponent implements OnInit {
  patientName: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.patientName = `${user.firstName} ${user.lastName}`;
    }
  }

  goToProfile() {
    this.router.navigate(['/patient-dashboard/profile']);
  }

  logout() {
    this.authService.logout();
  }
}
