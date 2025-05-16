import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Patient {
  id: number;
  name: string;
  age: number;
  diagnosis: string;
  lastVisit: string;
  nextAppointment: string;
  status: 'stable' | 'improving' | 'concerning';
  image: string;
}

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="patients-container">
      <div class="header">
        <div class="title-section">
          <h2>Mis Pacientes</h2>
          <p>{{ patients.length }} pacientes en total</p>
        </div>
        <button class="add-patient-btn" (click)="openAddPatientModal()">
          <span class="material-icons">person_add</span>
          Agregar Paciente
        </button>
      </div>

      <div class="search-bar">
        <span class="material-icons">search</span>
        <input
          type="text"
          placeholder="Buscar pacientes por nombre, diagnóstico..."
          [(ngModel)]="searchTerm"
          (input)="filterPatients()"
        >
      </div>

      <div class="patients-grid">
        <div class="patient-card" *ngFor="let patient of filteredPatients" (click)="goToPatientDetail(patient.id)">
          <div class="patient-header">
            <img [src]="patient.image || 'assets/default-patient.png'" [alt]="patient.name">
            <div class="status-badge" [class]="patient.status">
              {{ patient.status }}
            </div>
          </div>
          <div class="patient-info">
            <h3>{{ patient.name }}</h3>
            <p class="age">{{ patient.age }} años</p>
            <p class="diagnosis">{{ patient.diagnosis }}</p>
          </div>
          <div class="appointment-info">
            <div class="info-item">
              <span class="label">Última visita:</span>
              <span>{{ patient.lastVisit }}</span>
            </div>
            <div class="info-item">
              <span class="label">Próxima cita:</span>
              <span>{{ patient.nextAppointment }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar paciente -->
    <div class="modal" *ngIf="showAddPatientModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Agregar Nuevo Paciente</h2>
          <button class="close-btn" (click)="closeAddPatientModal()">
            <span class="material-icons">close</span>
          </button>
        </div>
        <form (ngSubmit)="addPatient()" #patientForm="ngForm">
          <div class="form-group">
            <label for="name">Nombre completo</label>
            <input type="text" id="name" name="name" [(ngModel)]="newPatient.name" required>
          </div>
          <div class="form-group">
            <label for="age">Edad</label>
            <input type="number" id="age" name="age" [(ngModel)]="newPatient.age" required>
          </div>
          <div class="form-group">
            <label for="diagnosis">Diagnóstico inicial</label>
            <textarea id="diagnosis" name="diagnosis" [(ngModel)]="newPatient.diagnosis" required></textarea>
          </div>
          <div class="form-group">
            <label for="nextAppointment">Fecha primera cita</label>
            <input type="date" id="nextAppointment" name="nextAppointment" [(ngModel)]="newPatient.nextAppointment" required>
          </div>
          <div class="modal-actions">
            <button type="button" class="cancel-btn" (click)="closeAddPatientModal()">Cancelar</button>
            <button type="submit" class="submit-btn" [disabled]="!patientForm.valid">Guardar Paciente</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .patients-container {
      padding: 1rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .title-section h2 {
      margin: 0;
      color: #1f2937;
    }

    .title-section p {
      margin: 0.5rem 0 0 0;
      color: #666;
    }

    .add-patient-btn {
      background-color: #3f51b5;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .add-patient-btn:hover {
      background-color: #303f9f;
    }

    .search-bar {
      background-color: white;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .search-bar input {
      border: none;
      outline: none;
      width: 100%;
      font-size: 1rem;
    }

    .search-bar .material-icons {
      color: #666;
    }

    .patients-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .patient-card {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .patient-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .patient-header {
      position: relative;
    }

    .patient-header img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }

    .status-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status-badge.stable {
      background-color: #d1fae5;
      color: #065f46;
    }

    .status-badge.improving {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .status-badge.concerning {
      background-color: #fee2e2;
      color: #991b1b;
    }

    .patient-info {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .patient-info h3 {
      margin: 0;
      color: #1f2937;
    }

    .patient-info .age {
      color: #666;
      margin: 0.25rem 0;
    }

    .patient-info .diagnosis {
      color: #1f2937;
      margin: 0.5rem 0 0 0;
      font-weight: 500;
    }

    .appointment-info {
      padding: 1rem 1.5rem;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .info-item .label {
      color: #666;
    }

    /* Modal styles */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: white;
      border-radius: 8px;
      width: 100%;
      max-width: 500px;
      padding: 2rem;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .modal-header h2 {
      margin: 0;
      color: #1f2937;
    }

    .close-btn {
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #374151;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 1rem;
    }

    .form-group textarea {
      height: 100px;
      resize: vertical;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .cancel-btn {
      padding: 0.75rem 1.5rem;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      background-color: white;
      color: #374151;
      cursor: pointer;
    }

    .submit-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      background-color: #3f51b5;
      color: white;
      cursor: pointer;
    }

    .submit-btn:disabled {
      background-color: #9fa8da;
      cursor: not-allowed;
    }
  `]
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      age: 35,
      diagnosis: 'Trastorno de ansiedad generalizada',
      lastVisit: '2024-03-10',
      nextAppointment: '2024-03-24',
      status: 'improving',
      image: 'assets/patient1.jpg'
    },
    {
      id: 2,
      name: 'María García',
      age: 28,
      diagnosis: 'Depresión moderada',
      lastVisit: '2024-03-15',
      nextAppointment: '2024-03-22',
      status: 'stable',
      image: 'assets/patient2.jpg'
    },
    // Agrega más pacientes aquí
  ];

  filteredPatients: Patient[] = this.patients;
  searchTerm: string = '';
  showAddPatientModal: boolean = false;

  newPatient = {
    name: '',
    age: null,
    diagnosis: '',
    nextAppointment: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.filterPatients();
  }

  filterPatients() {
    if (!this.searchTerm) {
      this.filteredPatients = this.patients;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(term) ||
      patient.diagnosis.toLowerCase().includes(term)
    );
  }

  goToPatientDetail(patientId: number) {
    this.router.navigate(['/doctor-dashboard/patients', patientId]);
  }

  openAddPatientModal() {
    this.showAddPatientModal = true;
  }

  closeAddPatientModal() {
    this.showAddPatientModal = false;
    this.newPatient = {
      name: '',
      age: null,
      diagnosis: '',
      nextAppointment: ''
    };
  }

  addPatient() {
    // Aquí iría la lógica para agregar el paciente a la base de datos
    const newPatient: Patient = {
      id: this.patients.length + 1,
      name: this.newPatient.name,
      age: this.newPatient.age!,
      diagnosis: this.newPatient.diagnosis,
      lastVisit: '-',
      nextAppointment: this.newPatient.nextAppointment,
      status: 'stable',
      image: ''
    };

    this.patients.unshift(newPatient);
    this.filterPatients();
    this.closeAddPatientModal();
  }
}
