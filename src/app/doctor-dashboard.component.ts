import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfessionalService } from './core/services/professional.service';
import { SessionService } from './core/services/session.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,

  ],
  template: `
    <div class="dashboard-container">
      <div class="stats-container">
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-card-title>Today's Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ todayAppointments }}</h2>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-card-title>Total Patients</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ totalPatients }}</h2>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-card-title>Pending Reports</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ pendingReports }}</h2>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="navigation-container">
        <button mat-raised-button color="primary" routerLink="patients">
          <mat-icon>people</mat-icon>
          Patients
        </button>
        <button mat-raised-button color="primary" routerLink="appointments">
          <mat-icon>event</mat-icon>
          Appointments
        </button>
        <button mat-raised-button color="primary" routerLink="reports">
          <mat-icon>description</mat-icon>
          Reports
        </button>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      text-align: center;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-card h2 {
      font-size: 2.5rem;
      color: #3f51b5;
      margin: 10px 0;
    }

    .navigation-container {
      display: flex;
      gap: 16px;
      margin-bottom: 30px;
    }

    button {
      flex: 1;
      padding: 16px;
    }

    mat-icon {
      margin-right: 8px;
    }
  `]
})
export class DoctorDashboardComponent implements OnInit {
  todayAppointments = 0;
  totalPatients = 0;
  pendingReports = 0;

  constructor(
    private professionalService: ProfessionalService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.loadDashboardStats();
  }

  private loadDashboardStats() {
    // TODO: Implement actual data loading from services
    this.todayAppointments = 5;
    this.totalPatients = 25;
    this.pendingReports = 3;
  }
}
