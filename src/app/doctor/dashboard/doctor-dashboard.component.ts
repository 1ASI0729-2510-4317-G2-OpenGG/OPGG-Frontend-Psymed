import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProfessionalService } from '../../core/services/professional.service';
import { SessionService } from '../../core/services/session.service';
import { Professional } from '../../core/models';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <header>
        <div class="header-left">
          <h1>SPYMED</h1>
          <nav>
            <a routerLink="patients" routerLinkActive="active">
              <span class="material-icons">people</span>
              Pacientes
            </a>
            <a routerLink="appointments" routerLinkActive="active">
              <span class="material-icons">event</span>
              Citas
            </a>
            <a routerLink="settings" routerLinkActive="active">
              <span class="material-icons">settings</span>
              Configuración
            </a>
          </nav>
        </div>
        <div class="user-info">
          <button class="profile-btn" (click)="goToProfile()">
            <img [src]="professional?.profileImage || 'assets/default-avatar.png'" alt="Doctor profile" class="profile-img">
            <span>Dr. {{ professional?.firstName }} {{ professional?.lastName }}</span>
          </button>
          <button (click)="logout()" class="logout-btn">
            <span class="material-icons">exit_to_app</span>
          </button>
        </div>
      </header>

      <main>
        <div class="welcome-section" *ngIf="isHomePage">
          <h2>Bienvenido, Dr. {{ professional?.firstName }} {{ professional?.lastName }}</h2>
          <p>Aquí tiene un resumen de su actividad</p>

          <div class="stats-grid">
            <div class="stat-card">
              <span class="material-icons">people</span>
              <div class="stat-info">
                <h3>{{ statistics.totalPatients }}</h3>
                <p>Total de pacientes</p>
              </div>
            </div>
            <div class="stat-card">
              <span class="material-icons">event</span>
              <div class="stat-info">
                <h3>{{ statistics.appointmentsToday }}</h3>
                <p>Citas para hoy</p>
              </div>
            </div>
            <div class="stat-card">
              <span class="material-icons">notifications</span>
              <div class="stat-info">
                <h3>{{ statistics.pendingActions }}</h3>
                <p>Acciones pendientes</p>
              </div>
            </div>
          </div>

          <div class="quick-actions">
            <button class="action-btn" (click)="goToAddPatient()">
              <span class="material-icons">person_add</span>
              Agregar Paciente
            </button>
            <button class="action-btn" (click)="goToSchedule()">
              <span class="material-icons">calendar_today</span>
              Programar Cita
            </button>
            <button class="action-btn" (click)="goToSettings()">
              <span class="material-icons">settings</span>
              Configuración
            </button>
          </div>
        </div>

        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .dashboard {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    header {
      background-color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 3rem;
    }

    h1 {
      color: #3f51b5;
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }

    nav {
      display: flex;
      gap: 1rem;
    }

    nav a {
      color: #666;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s;
    }

    nav a:hover {
      background-color: #f5f5f5;
      color: #3f51b5;
    }

    nav a.active {
      background-color: #e8eaf6;
      color: #3f51b5;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .profile-btn {
      background: none;
      border: none;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s;
    }

    .profile-btn:hover {
      background-color: #f5f5f5;
    }

    .profile-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .logout-btn {
      background: none;
      border: none;
      color: #666;
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
    }

    .logout-btn:hover {
      background-color: #fee2e2;
      color: #dc2626;
    }

    main {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-section {
      margin-bottom: 2rem;
    }

    .welcome-section h2 {
      color: #1f2937;
      margin: 0;
    }

    .welcome-section p {
      color: #666;
      margin: 0.5rem 0 2rem 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background-color: white;
      padding: 1.5rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .stat-card .material-icons {
      font-size: 2rem;
      color: #3f51b5;
    }

    .stat-info h3 {
      color: #1f2937;
      font-size: 1.5rem;
      margin: 0;
    }

    .stat-info p {
      color: #666;
      margin: 0;
      font-size: 0.875rem;
    }

    .quick-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      background-color: #3f51b5;
      color: white;
    }

    .action-btn:hover {
      background-color: #303f9f;
    }
  `]
})
export class DoctorDashboardComponent implements OnInit {
  professional: Professional | null = null;
  isHomePage: boolean = true;
  statistics = {
    totalPatients: 0,
    appointmentsToday: 0,
    pendingActions: 0
  };

  constructor(
    private router: Router,
    private professionalService: ProfessionalService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    // Obtener datos del profesional
    this.professional = this.professionalService.getCurrentProfessional();
    this.statistics = this.professionalService.getStatistics();

    // Detectar si estamos en la página principal
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/doctor-dashboard' || this.router.url === '/doctor-dashboard/';
    });
  }

  goToProfile() {
    this.router.navigate(['/doctor-dashboard/profile']);
  }

  goToAddPatient() {
    this.router.navigate(['/doctor-dashboard/patients'], { state: { showAddModal: true } });
  }

  goToSchedule() {
    this.router.navigate(['/doctor-dashboard/appointments/new']);
  }

  goToSettings() {
    this.router.navigate(['/doctor-dashboard/settings']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
