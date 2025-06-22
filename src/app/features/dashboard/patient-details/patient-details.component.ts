import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient, DiagnosisTask } from '../domain/patient.model';
import { AddNoteModalComponent } from './add-note-modal/add-note-modal.component';
import { AddAppointmentModalComponent } from './add-appointment-modal/add-appointment-modal.component';
import { AddDiagnosisModalComponent } from './add-diagnosis-modal/add-diagnosis-modal.component';
import { AddMedicationModalComponent } from './add-medication-modal/add-medication-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NavbarComponent,
    MatCheckboxModule
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="patient-details-container">
      <div class="patient-content">
        <!-- Panel izquierdo -->
        <mat-card class="patient-info-panel">
          <div class="patient-header">
            <div class="patient-avatar">
              <img [src]="patient.photoUrl || 'assets/avatars/default-avatar.png'" [alt]="patient.name">
            </div>
            <div class="patient-basic-info">
              <h2>{{patient.name}} {{patient.lastName}}</h2>
              <p class="patient-id">DNI: {{patient.dni}}</p>
            </div>
          </div>

          <div class="patient-details-form">
            <mat-form-field appearance="outline">
              <mat-label>Correo electrónico</mat-label>
              <input matInput [(ngModel)]="patient.email" readonly>
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Teléfono</mat-label>
              <input matInput [(ngModel)]="patient.phone" readonly>
              <mat-icon matSuffix>phone</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Fecha de nacimiento</mat-label>
              <input matInput [value]="patient.birthDate | date:'dd/MM/yyyy'" readonly>
              <mat-icon matSuffix>cake</mat-icon>
            </mat-form-field>
          </div>
        </mat-card>

        <!-- Panel derecho con secciones informativas -->
        <div class="info-sections">
          <!-- Sección de Diagnóstico -->
          <mat-card class="info-section">
            <div class="section-header">
              <div class="header-left">
                <mat-icon>psychology</mat-icon>
                <h3>Diagnóstico</h3>
              </div>
              <button mat-stroked-button color="primary" class="add-button" (click)="openAddDiagnosisModal()">
                <mat-icon>add_circle</mat-icon>
                <span>Agregar diagnóstico</span>
              </button>
            </div>
            <div class="section-content">
              <div class="diagnosis-list" *ngIf="patient.diagnoses?.length">
                <div class="diagnosis-item" *ngFor="let diagnosis of patient.diagnoses">
                  <div class="diagnosis-header">
                    <p class="diagnosis-date">{{diagnosis.diagnosisDate | date:'dd/MM/yyyy'}}</p>
                  </div>
                  <p class="diagnosis-description">{{diagnosis.description}}</p>
                  <div class="tasks-list" *ngIf="diagnosis.tasks?.length">
                    <h4>Tareas asignadas:</h4>
                    <div class="task-item" *ngFor="let task of diagnosis.tasks">
                      <mat-checkbox [(ngModel)]="task.completed"
                                  (change)="onTaskStatusChange(diagnosis.id, task)">
                        {{task.title}}
                      </mat-checkbox>
                    </div>
                  </div>
                </div>
              </div>
              <div class="empty-state" *ngIf="!patient.diagnoses?.length">
                <p>No hay diagnósticos registrados para este paciente.</p>
                <button mat-flat-button color="primary" (click)="openAddDiagnosisModal()">
                  <mat-icon>add_circle</mat-icon>
                  <span>Agregar primer diagnóstico</span>
                </button>
              </div>
            </div>
          </mat-card>

          <!-- Sección de Medicación -->
          <mat-card class="info-section">
            <div class="section-header">
              <div class="header-left">
                <mat-icon>medication</mat-icon>
                <h3>Medicación</h3>
              </div>
              <button mat-stroked-button color="primary" class="add-button" (click)="openAddMedicationModal()">
                <mat-icon>add_circle</mat-icon>
                <span>Agregar medicamento</span>
              </button>
            </div>
            <div class="section-content">
              <div class="medication-list" *ngIf="patient.medications?.length">
                <div class="medication-item" *ngFor="let medication of patient.medications">
                  <div class="medication-header">
                    <h4>{{medication.name}}</h4>
                    <p class="medication-date">Inicio: {{medication.startDate | date:'dd/MM/yyyy'}}</p>
                  </div>
                  <div class="medication-details">
                    <p><strong>Dosis:</strong> {{medication.dosage}}</p>
                    <p><strong>Frecuencia:</strong> Cada {{medication.frequency}} {{medication.frequencyUnit}}</p>
                    <p><strong>Duración:</strong> {{medication.duration}}</p>
                    <p *ngIf="medication.instructions"><strong>Instrucciones:</strong> {{medication.instructions}}</p>
                  </div>
                </div>
              </div>
              <div class="empty-state" *ngIf="!patient.medications?.length">
                <p>No hay medicamentos registrados para este paciente.</p>
                <button mat-flat-button color="primary" (click)="openAddMedicationModal()">
                  <mat-icon>add_circle</mat-icon>
                  <span>Agregar primer medicamento</span>
                </button>
              </div>
            </div>
          </mat-card>

          <!-- Sección de Notas -->
          <mat-card class="info-section">
            <div class="section-header">
              <div class="header-left">
                <mat-icon>note_alt</mat-icon>
                <h3>Notas</h3>
              </div>
              <button mat-stroked-button color="primary" class="add-button" (click)="openAddNoteModal()">
                <mat-icon>add_circle</mat-icon>
                <span>Agregar nota</span>
              </button>
            </div>
            <div class="section-content">
              <div class="notes-list" *ngIf="patient.notes?.length">
                <div class="note-item" *ngFor="let note of patient.notes">
                  <p class="note-text">{{note.text}}</p>
                  <p class="note-date">{{note.date | date:'dd/MM/yyyy HH:mm'}}</p>
                </div>
              </div>
              <div class="empty-state" *ngIf="!patient.notes?.length">
                <p>No hay notas registradas para este paciente.</p>
                <button mat-flat-button color="primary" (click)="openAddNoteModal()">
                  <mat-icon>add_circle</mat-icon>
                  <span>Agregar primera nota</span>
                </button>
              </div>
            </div>
          </mat-card>

          <!-- Sección de Citas -->
          <mat-card class="info-section">
            <div class="section-header">
              <div class="header-left">
                <mat-icon>event</mat-icon>
                <h3>Citas</h3>
              </div>
              <button mat-stroked-button color="primary" class="add-button" (click)="openAddAppointmentModal()">
                <mat-icon>add_circle</mat-icon>
                <span>Agendar cita</span>
              </button>
            </div>
            <div class="section-content">
              <div class="appointments-list" *ngIf="patient.appointments?.length">
                <div class="appointment-item" *ngFor="let appointment of patient.appointments">
                  <div class="appointment-info">
                    <p class="appointment-date">
                      <mat-icon>event</mat-icon>
                      {{appointment.date | date:'dd/MM/yyyy'}} - {{appointment.time}}
                    </p>
                    <p class="appointment-reason">{{appointment.reason}}</p>
                  </div>
                </div>
              </div>
              <div class="empty-state" *ngIf="!patient.appointments?.length">
                <p>No hay citas agendadas para este paciente.</p>
                <button mat-flat-button color="primary" (click)="openAddAppointmentModal()">
                  <mat-icon>add_circle</mat-icon>
                  <span>Agendar primera cita</span>
                </button>
              </div>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .patient-details-container {
      min-height: calc(100vh - 64px);
      background-color: #e0f7fa;
      padding: 2rem;
    }

    .patient-content {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 2rem;
    }

    .patient-info-panel {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      height: fit-content;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .patient-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .patient-avatar {
      width: 150px;
      height: 150px;
      margin: 0 auto 1rem;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .patient-basic-info {
      h2 {
        color: #0a192f;
        margin: 0;
        font-size: 1.5rem;
        font-weight: 500;
      }

      .patient-id {
        color: #666;
        margin: 0.5rem 0 0;
      }
    }

    .patient-details-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      mat-form-field {
        width: 100%;
      }
    }

    .info-sections {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-section {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e0f7fa;

      .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;

        mat-icon {
          color: #0a192f;
          font-size: 2rem;
          width: 2rem;
          height: 2rem;
        }

        h3 {
          color: #0a192f;
          margin: 0;
          font-size: 1.3rem;
          font-weight: 500;
        }
      }
    }

    .add-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      transition: all 0.2s ease;
      border-color: #0a192f;
      color: #0a192f;

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      span {
        font-weight: 500;
      }

      &:hover {
        background-color: rgba(10, 25, 47, 0.04);
        transform: translateY(-1px);
      }
    }

    .section-content {
      padding: 0.5rem 0;
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      background: #f5f5f5;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      p {
        color: #666;
        margin: 0;
      }

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1.5rem;
        border-radius: 20px;
        background-color: #0a192f;

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }

        &:hover {
          background-color: #142d4c;
          transform: translateY(-1px);
        }
      }
    }

    .diagnosis-list, .medication-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .diagnosis-item, .medication-item {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
      border: 1px solid #e0e0e0;
    }

    .diagnosis-header, .medication-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      h4 {
        margin: 0;
        color: #2c3e50;
        font-size: 1.1rem;
      }
    }

    .diagnosis-date, .medication-date {
      color: #666;
      font-size: 0.9rem;
      margin: 0;
    }

    .diagnosis-description {
      color: #2c3e50;
      margin: 8px 0;
      line-height: 1.5;
    }

    .tasks-list {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;

      h4 {
        margin: 0 0 12px;
        color: #2c3e50;
        font-size: 1rem;
      }
    }

    .task-item {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .medication-details {
      margin-top: 12px;

      p {
        margin: 4px 0;
        color: #2c3e50;

        strong {
          color: #1976d2;
        }
      }
    }

    @media (max-width: 900px) {
      .patient-content {
        grid-template-columns: 1fr;
      }

      .patient-info-panel {
        max-width: 500px;
        margin: 0 auto;
      }
    }

    @media (max-width: 600px) {
      .patient-details-container {
        padding: 1rem;
      }

      .appointment-form {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    dni: '',
    photoUrl: '',
    notes: [],
    appointments: [],
    diagnoses: [],
    medications: []
  };

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const patientId = params['id'];
      const patient = this.patientService.getPatientById(patientId);

      if (patient) {
        this.patient = {
          ...patient,
          notes: patient.notes || [],
          appointments: patient.appointments || []
        };
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  openAddNoteModal() {
    const dialogRef = this.dialog.open(AddNoteModalComponent, {
      width: '500px',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.patient.notes) {
          this.patient.notes = [];
        }
        this.patient.notes.unshift(result);
        this.patientService.updatePatient(this.patient);
      }
    });
  }

  openAddAppointmentModal(): void {
    const dialogRef = this.dialog.open(AddAppointmentModalComponent, {
      data: {
        existingAppointments: this.patient.appointments || []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.patient.appointments) {
          this.patient.appointments = [];
        }
        this.patient.appointments.push(result);
        this.patientService.updatePatient(this.patient);
      }
    });
  }

  openAddDiagnosisModal(): void {
    const dialogRef = this.dialog.open(AddDiagnosisModalComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.patient.diagnoses) {
          this.patient.diagnoses = [];
        }
        this.patient.diagnoses.unshift(result);
        this.patientService.updatePatient(this.patient);
      }
    });
  }

  openAddMedicationModal(): void {
    const dialogRef = this.dialog.open(AddMedicationModalComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.patient.medications) {
          this.patient.medications = [];
        }
        this.patient.medications.unshift(result);
        this.patientService.updatePatient(this.patient);
      }
    });
  }

  onTaskStatusChange(diagnosisId: string, task: DiagnosisTask): void {
    this.patientService.updatePatient(this.patient);
  }
}


