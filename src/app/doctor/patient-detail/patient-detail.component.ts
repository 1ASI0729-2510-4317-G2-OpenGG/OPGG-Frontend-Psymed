import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface PatientDetail {
  id: number;
  name: string;
  age: number;
  diagnosis: string;
  status: 'stable' | 'improving' | 'concerning';
  image: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  history: {
    date: string;
    type: 'appointment' | 'medication' | 'note';
    description: string;
  }[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
  }[];
  appointments: {
    date: string;
    time: string;
    type: string;
    status: 'scheduled' | 'completed' | 'cancelled';
  }[];
}

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="patient-detail">
      <div class="patient-header">
        <div class="patient-info">
          <img [src]="patient.image || 'assets/default-patient.png'" [alt]="patient.name">
          <div class="info-text">
            <h1>{{ patient.name }}</h1>
            <p class="age">{{ patient.age }} años</p>
            <div class="status" [class]="patient.status">
              {{ patient.status }}
            </div>
          </div>
        </div>
        <div class="actions">
          <button class="action-btn">
            <span class="material-icons">edit</span>
            Editar
          </button>
          <button class="action-btn">
            <span class="material-icons">event</span>
            Agendar Cita
          </button>
        </div>
      </div>

      <div class="content-grid">
        <div class="main-content">
          <section class="card diagnosis-section">
            <h2>Diagnóstico Actual</h2>
            <p>{{ patient.diagnosis }}</p>
          </section>

          <section class="card">
            <h2>Historial de Actividad</h2>
            <div class="timeline">
              <div class="timeline-item" *ngFor="let item of patient.history">
                <div class="timeline-icon" [ngClass]="item.type">
                  <span class="material-icons">
                    {{
                      item.type === 'appointment' ? 'event' :
                      item.type === 'medication' ? 'medication' : 'note'
                    }}
                  </span>
                </div>
                <div class="timeline-content">
                  <span class="date">{{ item.date }}</span>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="side-content">
          <section class="card">
            <h2>Información de Contacto</h2>
            <div class="contact-info">
              <p><span class="material-icons">email</span> {{ patient.email }}</p>
              <p><span class="material-icons">phone</span> {{ patient.phone }}</p>
              <p><span class="material-icons">home</span> {{ patient.address }}</p>
            </div>
            <div class="emergency-contact">
              <h3>Contacto de Emergencia</h3>
              <p><strong>{{ patient.emergencyContact.name }}</strong></p>
              <p>{{ patient.emergencyContact.relationship }}</p>
              <p>{{ patient.emergencyContact.phone }}</p>
            </div>
          </section>

          <section class="card">
            <h2>Medicación Actual</h2>
            <div class="medications-list">
              <div class="medication-item" *ngFor="let med of patient.medications">
                <h4>{{ med.name }}</h4>
                <p>{{ med.dosage }} - {{ med.frequency }}</p>
                <p class="dates">
                  <span>Inicio: {{ med.startDate }}</span>
                  <span *ngIf="med.endDate">Fin: {{ med.endDate }}</span>
                </p>
              </div>
            </div>
          </section>

          <section class="card">
            <h2>Próximas Citas</h2>
            <div class="appointments-list">
              <div class="appointment-item" *ngFor="let apt of patient.appointments">
                <div class="appointment-status" [class]="apt.status">
                  {{ apt.status }}
                </div>
                <div class="appointment-info">
                  <p class="date">{{ apt.date }} - {{ apt.time }}</p>
                  <p class="type">{{ apt.type }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .patient-detail {
      padding: 2rem;
    }

    .patient-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
    }

    .patient-info {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .patient-info img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #e8eaf6;
    }

    .info-text h1 {
      margin: 0;
      color: #1f2937;
    }

    .age {
      color: #666;
      margin: 0.5rem 0;
    }

    .status {
      display: inline-block;
      padding: 0.25rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status.stable {
      background-color: #d1fae5;
      color: #065f46;
    }

    .status.improving {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .status.concerning {
      background-color: #fee2e2;
      color: #991b1b;
    }

    .actions {
      display: flex;
      gap: 1rem;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      background-color: #3f51b5;
      color: white;
    }

    .action-btn:hover {
      background-color: #303f9f;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .card {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .card h2 {
      color: #1f2937;
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
    }

    .timeline {
      position: relative;
      padding-left: 2rem;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: #e5e7eb;
    }

    .timeline-item {
      position: relative;
      padding-bottom: 1.5rem;
    }

    .timeline-icon {
      position: absolute;
      left: -2.5rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: #e8eaf6;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .timeline-icon.appointment {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .timeline-icon.medication {
      background-color: #d1fae5;
      color: #065f46;
    }

    .timeline-icon.note {
      background-color: #fef3c7;
      color: #92400e;
    }

    .timeline-content {
      background-color: #f8fafc;
      padding: 1rem;
      border-radius: 8px;
    }

    .timeline-content .date {
      color: #666;
      font-size: 0.875rem;
    }

    .contact-info p {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.5rem 0;
      color: #374151;
    }

    .emergency-contact {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .emergency-contact h3 {
      color: #1f2937;
      font-size: 1rem;
      margin: 0 0 1rem 0;
    }

    .medications-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .medication-item {
      padding: 1rem;
      background-color: #f8fafc;
      border-radius: 8px;
    }

    .medication-item h4 {
      margin: 0;
      color: #1f2937;
    }

    .medication-item p {
      margin: 0.5rem 0 0 0;
      color: #374151;
    }

    .dates {
      display: flex;
      gap: 1rem;
      font-size: 0.875rem;
      color: #666;
    }

    .appointments-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .appointment-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #f8fafc;
      border-radius: 8px;
    }

    .appointment-status {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .appointment-status.scheduled {
      background-color: #dbeafe;
      color: #1e40af;
    }

    .appointment-status.completed {
      background-color: #d1fae5;
      color: #065f46;
    }

    .appointment-status.cancelled {
      background-color: #fee2e2;
      color: #991b1b;
    }

    .appointment-info .date {
      color: #1f2937;
      font-weight: 500;
      margin: 0;
    }

    .appointment-info .type {
      color: #666;
      font-size: 0.875rem;
      margin: 0.25rem 0 0 0;
    }
  `]
})
export class PatientDetailComponent implements OnInit {
  patient: PatientDetail = {
    id: 1,
    name: 'Juan Pérez',
    age: 35,
    diagnosis: 'Trastorno de ansiedad generalizada con episodios de pánico ocasionales. El paciente ha mostrado mejora significativa en las últimas semanas con la terapia cognitivo-conductual.',
    status: 'improving',
    image: 'assets/patient1.jpg',
    email: 'juan.perez@email.com',
    phone: '+51 999 888 777',
    address: 'Av. Principal 123, Lima',
    emergencyContact: {
      name: 'María Pérez',
      relationship: 'Esposa',
      phone: '+51 999 777 666'
    },
    history: [
      {
        date: '2024-03-15',
        type: 'appointment',
        description: 'Consulta de seguimiento - Reporta mejora en síntomas de ansiedad'
      },
      {
        date: '2024-03-10',
        type: 'medication',
        description: 'Ajuste de dosis de Sertralina a 75mg/día'
      },
      {
        date: '2024-03-01',
        type: 'note',
        description: 'Paciente reporta mejor calidad de sueño y menos episodios de ansiedad'
      }
    ],
    medications: [
      {
        name: 'Sertralina',
        dosage: '75mg',
        frequency: '1 vez al día',
        startDate: '2024-01-15'
      },
      {
        name: 'Alprazolam',
        dosage: '0.5mg',
        frequency: 'Según necesidad',
        startDate: '2024-01-15',
        endDate: '2024-04-15'
      }
    ],
    appointments: [
      {
        date: '2024-03-24',
        time: '15:00',
        type: 'Consulta de seguimiento',
        status: 'scheduled'
      },
      {
        date: '2024-03-15',
        time: '15:00',
        type: 'Consulta regular',
        status: 'completed'
      }
    ]
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Aquí iría la lógica para cargar los datos del paciente según el ID
      console.log('Patient ID:', params['id']);
    });
  }
}
