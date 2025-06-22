import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddPatientModalComponent } from './add-patient-modal/add-patient-modal.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { Patient } from './domain/patient.model';
import { PatientService } from './services/patient.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter } from '@angular/material/core';

interface DashboardAppointment {
  time: string;
  patientName: string;
  type: string;
  status: 'completed' | 'in-progress' | 'scheduled';
}

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatTooltipModule,
    NavbarComponent,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="dashboard-container">
      <!-- Panel Izquierdo - Calendario -->
      <div class="calendar-section">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Agenda</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="calendar-header">
              <h2>{{selectedDate | date:'EEEE, d MMMM'}}</h2>
              <button mat-stroked-button color="primary" (click)="openCalendar()">
                <mat-icon>calendar_today</mat-icon>
                OPEN CALENDAR
              </button>
            </div>

            <mat-form-field appearance="fill" class="date-picker">
              <input matInput [matDatepicker]="picker"
                     [(ngModel)]="selectedDate"
                     [matDatepickerFilter]="dateFilter">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker [dateClass]="dateClass"></mat-datepicker>
            </mat-form-field>

            <div class="calendar-legend">
              <div class="legend-item">
                <span class="dot available"></span>
                <span>Disponible</span>
              </div>
              <div class="legend-item">
                <span class="dot occupied"></span>
                <span>Ocupado</span>
              </div>
            </div>

            <div class="appointments-list">
              <div class="appointment-item" *ngFor="let appointment of todayAppointments">
                <div class="appointment-time">{{appointment.time}}</div>
                <div class="appointment-info">
                  <div class="patient-name">{{appointment.patientName}}</div>
                  <div class="appointment-type">{{appointment.type}}</div>
                </div>
                <div class="appointment-status" [class]="appointment.status">
                  {{appointment.status}}
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Panel Derecho - Lista de Pacientes -->
      <div class="patients-section">
        <div class="patients-header">
          <h2>Mis Pacientes</h2>
          <button mat-raised-button color="primary" (click)="addPatient()">
            <mat-icon>person_add</mat-icon>
            Add Patient
          </button>
        </div>

        <div class="patients-list">
          <div class="patient-card" *ngFor="let patient of patients">
            <div class="status-indicator" [class]="patient.status || 'active'"></div>
            <div class="patient-avatar">
              <img [src]="patient.photoUrl || 'assets/avatars/default-avatar.png'" [alt]="patient.name">
            </div>
            <div class="patient-info">
              <h3>{{patient.name}} {{patient.lastName}}</h3>
              <p>{{patient.age}} años</p>
              <p>{{patient.phone}} | {{patient.email}}</p>
            </div>
            <div class="patient-actions">
              <button mat-icon-button color="primary" (click)="viewPatientDetails(patient.id)">
                <mat-icon>visibility</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 2rem;
      padding: 2rem;
      max-width: 1600px;
      margin: 0 auto;
      min-height: calc(100vh - 64px);
      background-color: #f5f9fc;
    }

    .calendar-section, .patients-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    mat-card {
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h2 {
        margin: 0;
        color: #0a192f;
        font-size: 1.5rem;
      }
    }

    .date-picker {
      width: 100%;
      margin-bottom: 1rem;
    }

    .appointments-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .appointment-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
      gap: 1rem;

      .appointment-time {
        font-weight: 500;
        color: #0a192f;
        min-width: 80px;
      }

      .appointment-info {
        flex: 1;

        .patient-name {
          font-weight: 500;
          color: #0a192f;
        }

        .appointment-type {
          color: #64748b;
          font-size: 0.9rem;
        }
      }

      .appointment-status {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;

        &.scheduled {
          background: #e3f2fd;
          color: #1976d2;
        }

        &.in-progress {
          background: #e8f5e9;
          color: #2e7d32;
        }

        &.completed {
          background: #f5f5f5;
          color: #616161;
        }
      }
    }

    .patients-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h2 {
        margin: 0;
        color: #0a192f;
        font-size: 1.5rem;
      }

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    .patients-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .patient-card {
      position: relative;
      display: flex;
      align-items: center;
      padding: 1rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      gap: 1rem;

      .status-indicator {
        position: absolute;
        top: 1rem;
        left: 0;
        width: 4px;
        height: calc(100% - 2rem);
        border-radius: 2px;

        &.active {
          background: #4caf50;
        }

        &.pending {
          background: #ff9800;
        }

        &.inactive {
          background: #9e9e9e;
        }
      }
    }

    .patient-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .patient-info {
      flex: 1;

      h3 {
        margin: 0;
        color: #0a192f;
        font-size: 1.1rem;
      }

      p {
        margin: 0.2rem 0;
        color: #64748b;
        font-size: 0.9rem;
      }
    }

    .patient-actions {
      display: flex;
      gap: 0.5rem;
    }

    @media (max-width: 1200px) {
      .dashboard-container {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .dashboard-container {
        padding: 1rem;
      }

      .patients-list {
        grid-template-columns: 1fr;
      }
    }

    .calendar-legend {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
      padding: 0.5rem;
      background: #f8fafc;
      border-radius: 8px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #64748b;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;

      &.available {
        background-color: #4caf50;
      }

      &.occupied {
        background-color: #f44336;
      }
    }

    ::ng-deep {
      .occupied-date {
        background-color: #ffebee;
        border-radius: 50%;

        .mat-calendar-body-cell-content {
          color: #f44336;
        }
      }
    }
  `]
})
export class DoctorDashboardComponent implements OnInit {
  selectedDate = new Date();
  todayAppointments: DashboardAppointment[] = [
    {
      time: '09:00 AM',
      patientName: 'John Doe',
      type: 'Consulta Regular',
      status: 'completed'
    },
    {
      time: '10:30 AM',
      patientName: 'Maria Becerra',
      type: 'Primera Consulta',
      status: 'in-progress'
    },
    {
      time: '12:00 PM',
      patientName: 'Juan del Piero',
      type: 'Seguimiento',
      status: 'scheduled'
    },
    {
      time: '15:30 PM',
      patientName: 'Joshua Kimmich',
      type: 'Consulta Regular',
      status: 'scheduled'
    }
  ];

  patients: Patient[] = [];
  occupiedDates: Date[] = [
    new Date('2024-03-20'),
    new Date('2024-03-22'),
    new Date('2024-03-25')
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private patientService: PatientService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('es');
  }

  ngOnInit() {
    // Subscribe to patients updates
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
    });

    // Ensure calendar stays open
    setTimeout(() => {
      const calendar = document.querySelector('mat-calendar');
      if (calendar) {
        calendar.setAttribute('style', 'display: block !important');
      }
    });
  }

  addPatient() {
    const dialogRef = this.dialog.open(AddPatientModalComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'add-patient-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.addPatient(result);
      }
    });
  }

  viewPatientDetails(patientId: string) {
    this.router.navigate(['/dashboard/medico/paciente', patientId]);
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const day = date.getDay();
    // Disable weekends
    return day !== 0 && day !== 6;
  };

  dateClass = (date: Date): string => {
    const isOccupied = this.occupiedDates.some(occupiedDate =>
      occupiedDate.getDate() === date.getDate() &&
      occupiedDate.getMonth() === date.getMonth() &&
      occupiedDate.getFullYear() === date.getFullYear()
    );
    return isOccupied ? 'occupied-date' : 'available-date';
  };

  openCalendar() {
    console.log('Abrir calendario');
  }

  toggleFavorite(patient: Patient) {
    patient.isFavorite = !patient.isFavorite;
  }
}


