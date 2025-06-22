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
          <div class="header-actions">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Buscar paciente</mat-label>
              <input matInput [(ngModel)]="searchTerm" (input)="onSearch($event)" placeholder="Buscar por nombre, DNI o email">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
            <button mat-raised-button color="primary" (click)="addPatient()">
              <mat-icon>add</mat-icon>
              Nuevo Paciente
            </button>
          </div>
        </div>

        <div class="patients-grid">
          <div class="patient-card" *ngFor="let patient of filteredPatients">
            <div class="patient-header">
              <div class="patient-info">
                <div class="patient-avatar">
                  <img [src]="patient.photoUrl || 'assets/avatars/default-avatar.png'" [alt]="patient.name">
                </div>
                <div class="patient-basic-info">
                  <h3>{{patient.name}} {{patient.lastName}}</h3>
                  <p>DNI: {{patient.dni}}</p>
                  <p>{{calculateAge(patient.birthDate)}} años</p>
                </div>
              </div>
              <button mat-icon-button class="favorite-button" (click)="toggleFavorite(patient)">
                <mat-icon [class.favorite]="patient.favorite">star</mat-icon>
              </button>
            </div>
            <div class="patient-actions">
              <button mat-button color="primary" (click)="viewPatientDetails(patient)">
                <mat-icon>visibility</mat-icon>
                Ver detalles
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
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;

      .mat-mdc-form-field {
        margin-bottom: -1.34375em;
      }

      button {
        height: 56px;
        margin-top: -8px;
        padding: 0 24px;
        font-size: 16px;

        mat-icon {
          margin-right: 8px;
          font-size: 24px;
          height: 24px;
          width: 24px;
        }
      }
    }

    .search-field {
      width: 300px;

      ::ng-deep {
        .mat-mdc-text-field-wrapper {
          height: 56px;
        }

        .mat-mdc-form-field-flex {
          height: 56px;
        }

        .mdc-text-field--outlined {
          --mdc-outlined-text-field-container-height: 56px;
        }
      }
    }

    .patients-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .patient-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .patient-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .patient-info {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .patient-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .patient-basic-info {
      h3 {
        margin: 0 0 0.5rem;
        color: #0a192f;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: #64748b;
        font-size: 0.9rem;
        line-height: 1.4;
      }
    }

    .favorite-button {
      .mat-icon {
        color: #cbd5e1;
        transition: color 0.3s ease;

        &.favorite {
          color: #f59e0b;
        }
      }
    }

    .patient-actions {
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid #e2e8f0;
      padding-top: 1rem;

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    @media (max-width: 1200px) {
      .dashboard-container {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        align-items: stretch;
      }

      .header-actions {
        flex-direction: column;
      }

      .search-field {
        width: 100%;
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
  filteredPatients: Patient[] = [];
  searchTerm: string = '';
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
    this.loadPatients();

    // Ensure calendar stays open
    setTimeout(() => {
      const calendar = document.querySelector('mat-calendar');
      if (calendar) {
        calendar.setAttribute('style', 'display: block !important');
      }
    });
  }

  loadPatients() {
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
      this.filterPatients();
    });
  }

  filterPatients() {
    if (!this.searchTerm.trim()) {
      this.filteredPatients = [...this.patients];
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTermLower) ||
      patient.lastName.toLowerCase().includes(searchTermLower) ||
      patient.dni.toLowerCase().includes(searchTermLower) ||
      patient.email.toLowerCase().includes(searchTermLower)
    );
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filterPatients();
  }

  addPatient() {
    const dialogRef = this.dialog.open(AddPatientModalComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.addPatient(result);
      }
    });
  }

  viewPatientDetails(patient: Patient) {
    this.router.navigate(['/dashboard/medico/paciente', patient.id]);
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

  calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  toggleFavorite(patient: Patient): void {
    patient.favorite = !patient.favorite;
    this.patientService.updatePatient(patient);
  }
}


