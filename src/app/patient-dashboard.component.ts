import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PatientService } from './core/services/patient.service';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="stats-container">
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-card-title>Next Appointment</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h3>{{ nextAppointmentDate | date:'medium' }}</h3>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-card-title>Mood Tracker</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="mood-indicator">
              <mat-icon [style.color]="moodColor">{{ moodIcon }}</mat-icon>
              <span>{{ currentMood }}</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-card-title>Active Medications</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ activeMedications }}</h2>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="navigation-container">
        <button mat-raised-button color="primary" routerLink="appointments">
          <mat-icon>event</mat-icon>
          My Appointments
        </button>
        <button mat-raised-button color="primary" routerLink="mood-tracker">
          <mat-icon>mood</mat-icon>
          Mood Tracker
        </button>
        <button mat-raised-button color="primary" routerLink="medications">
          <mat-icon>medication</mat-icon>
          Medications
        </button>
        <button mat-raised-button color="primary" routerLink="history">
          <mat-icon>history</mat-icon>
          Medical History
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

    .stat-card h2, .stat-card h3 {
      color: #3f51b5;
      margin: 10px 0;
    }

    .mood-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 1.2rem;
    }

    .mood-indicator mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .navigation-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 30px;
    }

    button {
      padding: 16px;
    }

    mat-icon {
      margin-right: 8px;
    }
  `]
})
export class PatientDashboardComponent implements OnInit {
  nextAppointmentDate: Date | null = null;
  currentMood = 'Good';
  moodIcon = 'sentiment_satisfied';
  moodColor = '#4CAF50';
  activeMedications = 0;

  constructor(
    private patientService: PatientService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    // TODO: Implement actual data loading from services
    this.nextAppointmentDate = new Date(Date.now() + 86400000); // Tomorrow
    this.activeMedications = 2;
  }
}
