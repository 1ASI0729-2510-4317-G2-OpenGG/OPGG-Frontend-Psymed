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
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="dashboard-container">
      <div class="patients-section">
        <div class="section-header">
          <h2>Mis Pacientes</h2>
          <button mat-raised-button color="primary" (click)="openAddPatientModal()">
            <mat-icon>add</mat-icon>
            Nuevo Paciente
          </button>
        </div>

        <div class="patients-grid">
          <mat-card *ngFor="let patient of patients" class="patient-card" (click)="viewPatientDetails(patient.id)">
            <mat-card-header>
              <div mat-card-avatar class="patient-avatar">
                <mat-icon>person</mat-icon>
              </div>
              <mat-card-title>{{patient.name}} {{patient.lastName}}</mat-card-title>
              <mat-card-subtitle>DNI: {{patient.dni}}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p><mat-icon>email</mat-icon> {{patient.email}}</p>
              <p><mat-icon>phone</mat-icon> {{patient.phone}}</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      h2 {
        margin: 0;
        color: #333;
      }
    }

    .patients-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .patient-card {
      cursor: pointer;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
    }

    .patient-avatar {
      background-color: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;

      mat-icon {
        color: #666;
      }
    }

    mat-card-content {
      margin-top: 1rem;

      p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0;
        color: #666;

        mat-icon {
          font-size: 1.2rem;
          width: 1.2rem;
          height: 1.2rem;
        }
      }
    }
  `]
})
export class DoctorDashboardComponent implements OnInit {
  selectedDate: Date = new Date();
  patients: Patient[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.patientService.patients$.subscribe(patients => {
      this.patients = patients;
    });
  }

  openAddPatientModal() {
    this.router.navigate(['/dashboard/patient/new']);
  }

  viewPatientDetails(id: string) {
    this.router.navigate(['/dashboard/patient', id]);
  }

  onDateSelected(date: Date | null) {
    if (date) {
      this.selectedDate = date;
    }
  }

  dateClass = (date: Date): string => {
    if (this.hasAppointmentOnDate(date)) return 'booked';
    if (this.isDateUnavailable(date)) return 'unavailable';
    return '';
  };

  hasAppointmentOnDate(date: Date): boolean {
    return this.patients.some(patient =>
      patient.appointments?.some(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate.getFullYear() === date.getFullYear() &&
               appointmentDate.getMonth() === date.getMonth() &&
               appointmentDate.getDate() === date.getDate();
      })
    );
  }

  isDateUnavailable(date: Date): boolean {
    return this.patientService.getUnavailableDates().some(unavailableDate =>
      unavailableDate.getFullYear() === date.getFullYear() &&
      unavailableDate.getMonth() === date.getMonth() &&
      unavailableDate.getDate() === date.getDate()
    );
  }

  toggleDateAvailability(date: Date) {
    if (this.isDateUnavailable(date)) {
      this.patientService.removeUnavailableDate(date);
    } else {
      this.patientService.addUnavailableDate(date);
    }
  }
}


