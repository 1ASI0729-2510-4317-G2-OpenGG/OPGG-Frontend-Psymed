import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { PrescriptionService } from '../../../shared/services/prescription.service';

@Component({
  selector: 'app-medic-patients',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="patients-container">
      <div class="header">
        <h1>Mis Pacientes</h1>
        <p>Gestiona la información de tus pacientes</p>
      </div>

      <div class="patients-grid" *ngIf="patients.length > 0">
        <div *ngFor="let patient of patients" class="patient-card">
          <div class="patient-header">
            <div class="patient-avatar">
              {{ patient.name.charAt(0) }}
            </div>
            <div class="patient-info">
              <h3>{{ patient.name }}</h3>
              <p>{{ patient.age }} años</p>
              <p>{{ patient.email }}</p>
            </div>
          </div>

          <div class="patient-stats">
            <div class="stat">
              <span class="stat-number">{{ patient.totalAppointments }}</span>
              <span class="stat-label">Citas</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ patient.lastAppointment }}</span>
              <span class="stat-label">Última cita</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ patient.prescriptions }}</span>
              <span class="stat-label">Prescripciones</span>
            </div>
          </div>

          <div class="patient-actions">
            <button class="btn-action btn-primary" (click)="viewPatientHistory(patient)">
              📋 Historial
            </button>
            <button class="btn-action btn-secondary" (click)="createPrescription(patient)">
              💊 Nueva Prescripción
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="patients.length === 0" class="empty-state">
        <div class="empty-icon">👥</div>
        <h2>No tienes pacientes asignados</h2>
        <p>Los pacientes aparecerán aquí cuando tengas citas programadas</p>
      </div>
    </div>
  `,
  styles: [`
    .patients-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header h1 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .header p {
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    .patients-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .patient-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .patient-card:hover {
      transform: translateY(-5px);
    }

    .patient-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .patient-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #27ae60, #2ecc71);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      margin-right: 1rem;
    }

    .patient-info h3 {
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }

    .patient-info p {
      color: #7f8c8d;
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }

    .patient-stats {
      display: flex;
      justify-content: space-around;
      margin-bottom: 2rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
      color: #27ae60;
    }

    .stat-label {
      font-size: 0.8rem;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .patient-actions {
      display: flex;
      gap: 1rem;
    }

    .btn-action {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #3498db;
      color: white;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    .btn-secondary {
      background: #27ae60;
      color: white;
    }

    .btn-secondary:hover {
      background: #219a52;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #7f8c8d;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
      .patients-grid {
        grid-template-columns: 1fr;
      }

      .patient-actions {
        flex-direction: column;
      }
    }
  `]
})
export class MedicPatientsComponent implements OnInit {
  patients: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  private loadPatients(): void {
    const medicId = 1; // En un caso real vendría del usuario logueado

    this.appointmentService.getAppointmentsByMedic(medicId).subscribe(
      appointments => {
        const uniquePatients = new Map();

        appointments.forEach(appointment => {
          if (!uniquePatients.has(appointment.patientId)) {
            uniquePatients.set(appointment.patientId, {
              id: appointment.patientId,
              name: appointment.patientName,
              age: Math.floor(Math.random() * 60) + 18,
              email: appointment.patientName.toLowerCase().replace(/\s+/g, '.') + '@email.com',
              totalAppointments: 0,
              lastAppointment: '',
              prescriptions: 0
            });
          }
        });

        // Contar citas por paciente
        appointments.forEach(appointment => {
          const patient = uniquePatients.get(appointment.patientId);
          patient.totalAppointments++;
          if (!patient.lastAppointment || appointment.date > patient.lastAppointment) {
            patient.lastAppointment = appointment.date;
          }
        });

        // Contar prescripciones
        this.prescriptionService.getPrescriptionsByMedic(medicId).subscribe(
          prescriptions => {
            prescriptions.forEach(prescription => {
              const patient = uniquePatients.get(prescription.patientId);
              if (patient) {
                patient.prescriptions++;
              }
            });

            this.patients = Array.from(uniquePatients.values());
            console.log('Pacientes cargados:', this.patients);
          }
        );
      }
    );
  }

  viewPatientHistory(patient: any): void {
    console.log('Ver historial de:', patient.name);
  }

  createPrescription(patient: any): void {
    console.log('Crear prescripción para:', patient.name);
  }
}
