import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SessionService } from '../../core/services/session.service';

interface Appointment {
  id: number;
  patientName: string;
  patientId: number;
  date: Date;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  template: `
    <div class="appointments-container">
      <div class="header">
        <h1>Appointments</h1>
        <button mat-raised-button color="primary" (click)="createAppointment()">
          <mat-icon>add</mat-icon>
          New Appointment
        </button>
      </div>

      <div class="appointments-content">
        <mat-card class="upcoming-appointments">
          <mat-card-header>
            <mat-card-title>Today's Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="appointment-list">
              <div *ngFor="let appointment of todayAppointments" class="appointment-item">
                <div class="time">{{ appointment.time }}</div>
                <div class="details">
                  <div class="patient-name">{{ appointment.patientName }}</div>
                  <div class="appointment-type">{{ appointment.type }}</div>
                </div>
                <div class="actions">
                  <button mat-icon-button color="primary" (click)="startSession(appointment)">
                    <mat-icon>video_call</mat-icon>
                  </button>
                  <button mat-icon-button (click)="viewDetails(appointment)">
                    <mat-icon>info</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="appointment-schedule">
          <mat-card-header>
            <mat-card-title>Upcoming Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="upcomingAppointments" matSort>
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>
                <td mat-cell *matCellDef="let row"> {{row.date | date}} </td>
              </ng-container>

              <ng-container matColumnDef="time">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Time </th>
                <td mat-cell *matCellDef="let row"> {{row.time}} </td>
              </ng-container>

              <ng-container matColumnDef="patientName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Patient </th>
                <td mat-cell *matCellDef="let row"> {{row.patientName}} </td>
              </ng-container>

              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Type </th>
                <td mat-cell *matCellDef="let row"> {{row.type}} </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
                <td mat-cell *matCellDef="let row">
                  <span [class]="'status-badge ' + row.status.toLowerCase()">
                    {{row.status}}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let row">
                  <button mat-icon-button color="primary" (click)="editAppointment(row)">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="cancelAppointment(row)">
                    <mat-icon>cancel</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 25]"></mat-paginator>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .appointments-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .appointments-content {
      display: grid;
      gap: 20px;
    }

    .upcoming-appointments {
      margin-bottom: 20px;
    }

    .appointment-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .appointment-item {
      display: flex;
      align-items: center;
      padding: 12px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .time {
      font-size: 1.1rem;
      font-weight: 500;
      color: #3f51b5;
      width: 100px;
    }

    .details {
      flex: 1;
    }

    .patient-name {
      font-weight: 500;
    }

    .appointment-type {
      color: #666;
      font-size: 0.9rem;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    table {
      width: 100%;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .scheduled {
      background-color: #E8F5E9;
      color: #2E7D32;
    }

    .completed {
      background-color: #E3F2FD;
      color: #1565C0;
    }

    .cancelled {
      background-color: #FFEBEE;
      color: #C62828;
    }

    .mat-column-actions {
      width: 100px;
      text-align: center;
    }

    .mat-column-status {
      width: 120px;
    }
  `]
})
export class AppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'time', 'patientName', 'type', 'status', 'actions'];
  todayAppointments: Appointment[] = [];
  upcomingAppointments: Appointment[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    // TODO: Implement actual data loading from SessionService
    const mockAppointments: Appointment[] = [
      {
        id: 1,
        patientName: 'John Doe',
        patientId: 1,
        date: new Date(),
        time: '09:00 AM',
        duration: 60,
        type: 'Follow-up',
        status: 'scheduled'
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        patientId: 2,
        date: new Date(),
        time: '10:30 AM',
        duration: 45,
        type: 'Initial Consultation',
        status: 'scheduled'
      },
      {
        id: 3,
        patientName: 'Alice Johnson',
        patientId: 3,
        date: new Date(Date.now() + 86400000),
        time: '02:00 PM',
        duration: 60,
        type: 'Therapy Session',
        status: 'scheduled'
      }
    ];

    this.todayAppointments = mockAppointments.filter(
      app => app.date.toDateString() === new Date().toDateString()
    );
    this.upcomingAppointments = mockAppointments;
  }

  createAppointment() {
    // TODO: Implement appointment creation
    console.log('Creating new appointment');
  }

  editAppointment(appointment: Appointment) {
    console.log('Editing appointment:', appointment);
  }

  cancelAppointment(appointment: Appointment) {
    console.log('Cancelling appointment:', appointment);
  }

  startSession(appointment: Appointment) {
    console.log('Starting session with:', appointment);
  }

  viewDetails(appointment: Appointment) {
    console.log('Viewing details for:', appointment);
  }
}
