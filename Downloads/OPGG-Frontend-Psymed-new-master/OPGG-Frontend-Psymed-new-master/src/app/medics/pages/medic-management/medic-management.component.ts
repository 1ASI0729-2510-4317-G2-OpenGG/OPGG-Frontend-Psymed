import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicService } from '../../services/medic.service';
import { Medic } from '../../model/medic.entity';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { PrescriptionService } from '../../../shared/services/prescription.service';
import { Prescription } from '../../../shared/model/prescription.entity';

@Component({
  selector: 'app-medic-management',
  standalone: true,
  imports: [CommonModule],
    templateUrl: './medic-management.component.html',
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      color: #2c3e50;
      margin: 0;
    }

    .patients-grid, .medics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .patient-card, .medic-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .patient-card:hover, .medic-card:hover {
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

    .patient-info h3, .medic-header h3 {
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }

    .patient-info p, .medic-header p {
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

    .patient-actions, .medic-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .btn-action, .btn-primary {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #27ae60;
      color: white;
    }

    .btn-primary:hover {
      background: #219a52;
    }

    .btn-secondary {
      background: #3498db;
      color: white;
    }

    .btn-secondary:hover {
      background: #2980b9;
    }

    .btn-danger {
      background: #e74c3c;
      color: white;
    }

    .btn-danger:hover {
      background: #c0392b;
    }

    .prescriptions-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .prescription-card {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .prescription-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e9ecef;
    }

    .medication-count {
      background: #27ae60;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.9rem;
    }

    .diagnosis {
      margin-bottom: 1.5rem;
      color: #2c3e50;
    }

    .medications h4 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .medication-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .medication-item {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 6px;
      border-left: 4px solid #27ae60;
    }

    .medication-name {
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }

    .medication-details {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .medication-instructions {
      color: #7f8c8d;
      font-size: 0.9rem;
      font-style: italic;
    }

    .instructions {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #e9ecef;
    }

    .instructions p {
      margin: 0.5rem 0 0 0;
      color: #7f8c8d;
    }

    .prescription-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #e9ecef;
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
      .container {
        padding: 1rem;
      }

      .patients-grid, .medics-grid {
        grid-template-columns: 1fr;
      }

      .patient-actions, .medic-actions, .prescription-actions {
        flex-direction: column;
      }
    }
  `]
})
export class MedicManagementComponent implements OnInit {
  medics: Medic[] = [];
  patients: any[] = [];
  prescriptions: Prescription[] = [];
  isLoading = false;
  currentView: 'patients' | 'prescriptions' | 'default' = 'default';

  constructor(
    private medicService: MedicService,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit(): void {
    // Determinar la vista según la URL
    const url = this.router.url;
    if (url.includes('/patients')) {
      this.currentView = 'patients';
      this.loadPatients();
    } else if (url.includes('/prescriptions')) {
      this.currentView = 'prescriptions';
      this.loadPrescriptions();
    } else {
      this.currentView = 'default';
      this.loadMedics();
    }
  }

  loadMedics(): void {
    this.isLoading = true;
    // Simular carga de datos
    setTimeout(() => {
      this.medics = [
        new Medic({
          id: 1,
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan.perez@hospital.com',
          phone: '555-0001',
          specialty: 'Cardiología',
          licenseNumber: 'MED-001',
          yearsOfExperience: 8,
          consultationFee: 150,
          workingHours: '8:00 AM - 5:00 PM'
        }),
        new Medic({
          id: 2,
          firstName: 'María',
          lastName: 'García',
          email: 'maria.garcia@hospital.com',
          phone: '555-0002',
          specialty: 'Pediatría',
          licenseNumber: 'MED-002',
          yearsOfExperience: 12,
          consultationFee: 120,
          workingHours: '9:00 AM - 6:00 PM'
        }),
        new Medic({
          id: 3,
          firstName: 'Carlos',
          lastName: 'Rodríguez',
          email: 'carlos.rodriguez@hospital.com',
          phone: '555-0003',
          specialty: 'Neurología',
          licenseNumber: 'MED-003',
          yearsOfExperience: 15,
          consultationFee: 200,
          workingHours: '10:00 AM - 7:00 PM'
        })
      ];
      this.isLoading = false;
    }, 1000);
  }

  onCreateMedic(): void {
    // Logic to create new medic
    console.log('Create new medic');
  }

  onEditMedic(medic: Medic): void {
    // Logic to edit medic
    console.log('Edit medic:', medic);
  }

  onDeleteMedic(medic: Medic): void {
    // Logic to delete medic
    console.log('Delete medic:', medic);
  }

  // Métodos para la vista de pacientes
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

  // Métodos para la vista de prescripciones
  private loadPrescriptions(): void {
    const medicId = 1; // En un caso real vendría del usuario logueado
    this.prescriptionService.getPrescriptionsByMedic(medicId).subscribe(
      prescriptions => {
        this.prescriptions = prescriptions;
        console.log('Prescripciones cargadas:', this.prescriptions);
      }
    );
  }

  editPrescription(prescription: Prescription): void {
    console.log('Editar prescripción:', prescription);
  }

  duplicatePrescription(prescription: Prescription): void {
    console.log('Duplicar prescripción:', prescription);
  }
}
