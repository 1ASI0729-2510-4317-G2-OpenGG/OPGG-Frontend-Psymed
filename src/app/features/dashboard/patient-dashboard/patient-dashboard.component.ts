import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { PatientService } from '../services/patient.service';
import { Patient, Appointment, Medication, DiagnosisTask } from '../domain/patient.model';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="dashboard-container">
      <div class="welcome-header">
        <h1>Hola {{patient.name}},</h1>
        <p>Bienvenido a tu panel de paciente</p>
      </div>
      <div class="dashboard-content">
        <!-- Columna izquierda - Citas -->
        <div class="appointments-section">
          <mat-card>
            <mat-card-header>
              <mat-icon mat-card-avatar>event</mat-icon>
              <mat-card-title>Mis Citas</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <ng-container *ngIf="patient">
                <div class="appointments-list" *ngIf="patient.appointments?.length">
                  <div class="appointment-item" *ngFor="let appointment of patient.appointments">
                    <div class="appointment-date">
                      <mat-icon>calendar_today</mat-icon>
                      <span>{{appointment.date | date:'dd/MM/yyyy'}}</span>
                    </div>
                    <div class="appointment-time">
                      <mat-icon>schedule</mat-icon>
                      <span>{{appointment.time}}</span>
                    </div>
                    <p class="appointment-reason">{{appointment.reason}}</p>
                  </div>
                </div>
                <div class="empty-state" *ngIf="!patient.appointments?.length">
                  <p>No tienes citas programadas</p>
                </div>
              </ng-container>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Columna derecha -->
        <div class="right-column">
          <!-- Sección de Medicamentos -->
          <mat-card class="medications-section">
            <mat-card-header>
              <mat-icon mat-card-avatar>medication</mat-icon>
              <mat-card-title>Mis Medicamentos</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <ng-container *ngIf="patient">
                <div class="medications-list" *ngIf="patient.medications?.length">
                  <div class="medication-item" *ngFor="let medication of patient.medications">
                    <div class="medication-header">
                      <h3>{{medication.name}}</h3>
                      <span class="dosage">{{medication.dosage}}</span>
                    </div>
                    <div class="medication-schedule">
                      <mat-icon>schedule</mat-icon>
                      <span>Cada {{medication.frequency}} {{medication.frequencyUnit}}</span>
                    </div>
                    <p class="medication-duration">Duración: {{medication.duration}}</p>
                    <p class="medication-instructions" *ngIf="medication.instructions">
                      {{medication.instructions}}
                    </p>
                  </div>
                </div>
                <div class="empty-state" *ngIf="!patient.medications?.length">
                  <p>No tienes medicamentos asignados</p>
                </div>
              </ng-container>
            </mat-card-content>
          </mat-card>

          <!-- Sección de Tareas y Diagnóstico -->
          <mat-card class="tasks-section">
            <mat-card-header>
              <mat-icon mat-card-avatar>assignment</mat-icon>
              <mat-card-title>Mis Tareas</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <ng-container *ngIf="patient">
                <div class="diagnoses-list" *ngIf="patient.diagnoses?.length">
                  <div class="diagnosis-item" *ngFor="let diagnosis of patient.diagnoses">
                    <div class="diagnosis-header">
                      <p class="diagnosis-date">{{diagnosis.diagnosisDate | date:'dd/MM/yyyy'}}</p>
                    </div>
                    <p class="diagnosis-description">{{diagnosis.description}}</p>
                    <div class="tasks-list" *ngIf="diagnosis.tasks?.length">
                      <h4>Tareas asignadas:</h4>
                      <div class="task-item" *ngFor="let task of diagnosis.tasks">
                        <mat-checkbox
                          [(ngModel)]="task.completed"
                          (change)="onTaskStatusChange(diagnosis.id, task)">
                          {{task.title}}
                        </mat-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="empty-state" *ngIf="!patient.diagnoses?.length">
                  <p>No hay diagnósticos o tareas asignadas</p>
                </div>
              </ng-container>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      min-height: calc(100vh - 64px);
      background-color: #e0f7fa;
    }

    .welcome-header {
      max-width: 1400px;
      margin: 0 auto 2rem;
      padding: 0 1rem;

      h1 {
        color: #2c3e50;
        font-size: 2rem;
        margin: 0;
        font-weight: 500;
      }

      p {
        color: #64748b;
        margin: 0.5rem 0 0;
        font-size: 1.1rem;
      }
    }

    .dashboard-content {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 2rem;
    }

    mat-card {
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    mat-card-header {
      padding: 1rem;
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 1rem;

      mat-icon {
        color: #1976d2;
      }

      mat-card-title {
        margin: 0;
        font-size: 1.25rem;
        color: #2c3e50;
      }
    }

    mat-card-content {
      padding: 0 1rem 1rem;
    }

    .appointments-list, .medications-list, .diagnoses-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .appointment-item {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;
      border: 1px solid #e0e0e0;

      .appointment-date, .appointment-time {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #2c3e50;
        margin-bottom: 0.5rem;

        mat-icon {
          font-size: 1.2rem;
          width: 1.2rem;
          height: 1.2rem;
          color: #1976d2;
        }
      }

      .appointment-reason {
        margin: 0.5rem 0 0;
        color: #64748b;
      }
    }

    .medication-item {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;
      border: 1px solid #e0e0e0;

      .medication-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;

        h3 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        .dosage {
          color: #1976d2;
          font-weight: 500;
        }
      }

      .medication-schedule {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #2c3e50;
        margin-bottom: 0.5rem;

        mat-icon {
          font-size: 1.2rem;
          width: 1.2rem;
          height: 1.2rem;
          color: #1976d2;
        }
      }

      .medication-duration {
        color: #64748b;
        margin: 0.5rem 0;
      }

      .medication-instructions {
        color: #64748b;
        margin: 0.5rem 0 0;
        font-style: italic;
      }
    }

    .diagnosis-item {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;
      border: 1px solid #e0e0e0;

      .diagnosis-header {
        margin-bottom: 0.5rem;

        .diagnosis-date {
          color: #64748b;
          margin: 0;
          font-size: 0.9rem;
        }
      }

      .diagnosis-description {
        color: #2c3e50;
        margin: 0.5rem 0;
        line-height: 1.5;
      }

      .tasks-list {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #e0e0e0;

        h4 {
          margin: 0 0 0.5rem;
          color: #2c3e50;
          font-size: 1rem;
        }

        .task-item {
          margin-bottom: 0.5rem;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #64748b;

      p {
        margin: 0;
      }
    }

    @media (max-width: 1024px) {
      .dashboard-content {
        grid-template-columns: 1fr;
      }

      .right-column {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }
    }
  `]
})
export class PatientDashboardComponent implements OnInit {
  patient: Patient = {
    id: '1',
    name: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@example.com',
    phone: '123456789',
    birthDate: '1990-01-01',
    dni: '12345678',
    appointments: [
      {
        id: '1',
        date: '2024-03-25',
        time: '09:00',
        reason: 'Consulta de seguimiento mensual'
      },
      {
        id: '2',
        date: '2024-04-10',
        time: '15:30',
        reason: 'Evaluación de progreso y ajuste de tratamiento'
      },
      {
        id: '3',
        date: '2024-04-25',
        time: '11:00',
        reason: 'Sesión de terapia regular'
      }
    ],
    medications: [
      {
        id: '1',
        name: 'Sertralina',
        dosage: '50mg',
        frequency: 1,
        frequencyUnit: 'día',
        duration: '3 meses',
        instructions: 'Tomar por la mañana con el desayuno',
        startDate: '2024-03-01'
      },
      {
        id: '2',
        name: 'Clonazepam',
        dosage: '0.5mg',
        frequency: 2,
        frequencyUnit: 'días',
        duration: '1 mes',
        instructions: 'Tomar solo en caso de ansiedad severa',
        startDate: '2024-03-01'
      }
    ],
    diagnoses: [
      {
        id: '1',
        description: 'Trastorno de ansiedad generalizada con componentes depresivos leves',
        diagnosisDate: '2024-03-01',
        tasks: [
          {
            id: '1',
            title: 'Realizar ejercicios de respiración profunda (10 minutos, 2 veces al día)',
            completed: false
          },
          {
            id: '2',
            title: 'Mantener un diario de pensamientos y emociones',
            completed: true
          },
          {
            id: '3',
            title: 'Caminar al aire libre 30 minutos diarios',
            completed: false
          }
        ]
      },
      {
        id: '2',
        description: 'Plan de manejo del estrés',
        diagnosisDate: '2024-03-15',
        tasks: [
          {
            id: '4',
            title: 'Practicar meditación guiada usando la app recomendada',
            completed: false
          },
          {
            id: '5',
            title: 'Establecer una rutina regular de sueño',
            completed: true
          }
        ]
      }
    ]
  };

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    // Los datos ya están cargados como mock data
  }

  onTaskStatusChange(diagnosisId: string, task: DiagnosisTask): void {
    console.log(`Task ${task.id} status changed to ${task.completed}`);
    // Aquí iría la lógica para actualizar el estado en el backend
  }
}
