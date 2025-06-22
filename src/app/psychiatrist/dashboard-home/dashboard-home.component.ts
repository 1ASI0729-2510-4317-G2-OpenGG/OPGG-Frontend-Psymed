import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  template: `
    <div class="dashboard-content">
      <!-- Welcome Section -->
      <div class="welcome-section">
        <h1>Welcome back, Dr. {{ doctorName }}!</h1>
        <p class="subtitle">Here's your practice overview for today</p>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon primary">
              <mat-icon>event</mat-icon>
            </div>
            <div class="stat-info">
              <h3>{{ todayAppointments }}</h3>
              <p>Today's Appointments</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon accent">
              <mat-icon>people</mat-icon>
            </div>
            <div class="stat-info">
              <h3>{{ totalPatients }}</h3>
              <p>Total Patients</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon warn">
              <mat-icon>notifications</mat-icon>
            </div>
            <div class="stat-info">
              <h3>{{ pendingActions }}</h3>
              <p>Pending Actions</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Quick Actions -->
      <div class="section">
        <h2>Quick Actions</h2>
        <div class="quick-actions">
          <mat-card class="action-card" routerLink="../appointments/new">
            <mat-icon color="primary">add_circle</mat-icon>
            <h3>New Appointment</h3>
            <p>Schedule a new patient appointment</p>
          </mat-card>

          <mat-card class="action-card" routerLink="../patients">
            <mat-icon color="accent">people</mat-icon>
            <h3>Patient Records</h3>
            <p>View and manage patient records</p>
          </mat-card>

          <mat-card class="action-card" routerLink="../appointments">
            <mat-icon color="warn">event_note</mat-icon>
            <h3>My Schedule</h3>
            <p>View your upcoming appointments</p>
          </mat-card>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="section">
        <h2>Recent Activity</h2>
        <mat-card class="activity-card">
          <mat-card-content>
            <div class="activity-item">
              <div class="activity-icon primary">
                <mat-icon>person_add</mat-icon>
              </div>
              <div class="activity-details">
                <h4>New Patient Registration</h4>
                <p>John Smith - 30 minutes ago</p>
              </div>
            </div>
            <mat-divider></mat-divider>
            <div class="activity-item">
              <div class="activity-icon accent">
                <mat-icon>event_available</mat-icon>
              </div>
              <div class="activity-details">
                <h4>Appointment Completed</h4>
                <p>Sarah Johnson - 2 hours ago</p>
              </div>
            </div>
            <mat-divider></mat-divider>
            <div class="activity-item">
              <div class="activity-icon warn">
                <mat-icon>notifications_active</mat-icon>
              </div>
              <div class="activity-details">
                <h4>Prescription Renewal Request</h4>
                <p>Michael Brown - 3 hours ago</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
    }

    .welcome-section {
      margin-bottom: 32px;
    }

    .welcome-section h1 {
      font-size: 2rem;
      color: #2c3e50;
      margin: 0;
    }

    .subtitle {
      color: #666;
      margin-top: 8px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      border-radius: 12px;
      transition: transform 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-4px);
    }

    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      padding: 24px;
    }

    .stat-icon {
      border-radius: 12px;
      padding: 16px;
      margin-right: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon.primary {
      background-color: #e3f2fd;
    }

    .stat-icon.primary mat-icon {
      color: #1976d2;
    }

    .stat-icon.accent {
      background-color: #f3e5f5;
    }

    .stat-icon.accent mat-icon {
      color: #9c27b0;
    }

    .stat-icon.warn {
      background-color: #fbe9e7;
    }

    .stat-icon.warn mat-icon {
      color: #f44336;
    }

    .stat-info h3 {
      font-size: 2rem;
      margin: 0;
      color: #2c3e50;
    }

    .stat-info p {
      margin: 4px 0 0;
      color: #666;
    }

    .section {
      margin-bottom: 32px;
    }

    .section h2 {
      color: #2c3e50;
      margin-bottom: 16px;
      font-size: 1.5rem;
    }

    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .action-card {
      padding: 24px;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 12px;
    }

    .action-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .action-card mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      margin-bottom: 16px;
    }

    .action-card h3 {
      margin: 0 0 8px;
      color: #2c3e50;
    }

    .action-card p {
      margin: 0;
      color: #666;
    }

    .activity-card {
      border-radius: 12px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      padding: 16px 0;
    }

    .activity-icon {
      border-radius: 50%;
      padding: 12px;
      margin-right: 16px;
    }

    .activity-details h4 {
      margin: 0;
      color: #2c3e50;
    }

    .activity-details p {
      margin: 4px 0 0;
      color: #666;
      font-size: 0.9rem;
    }

    mat-divider {
      margin: 0;
    }

    @media (max-width: 768px) {
      .dashboard-content {
        padding: 16px;
      }

      .welcome-section h1 {
        font-size: 1.5rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .quick-actions {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardHomeComponent implements OnInit {
  doctorName = '';
  todayAppointments = 5;
  totalPatients = 28;
  pendingActions = 3;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;
    this.doctorName = user?.name || 'John Doe';
  }
}
