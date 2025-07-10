import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CalendarComponent, CalendarDay } from '../../../shared/components/calendar/calendar.component';
import { Appointment } from '../../../shared/model/appointment.entity';
import { AppointmentService } from '../../../shared/services/appointment.service';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CalendarComponent],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h1>Bienvenido, {{ patientName }}!</h1>
        <p>Panel de control del paciente</p>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-icon">📅</div>
          <h3>Próximas Citas</h3>
          <p class="card-number">{{ upcomingAppointments }}</p>
          <a routerLink="/patient/appointments" class="card-link">Ver todas las citas</a>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">👨‍⚕️</div>
          <h3>Médicos Disponibles</h3>
          <p class="card-number">{{ availableDoctors }}</p>
          <a href="#" class="card-link">Buscar médicos</a>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">📋</div>
          <h3>Historial Médico</h3>
          <p class="card-description">Consulta tu historial</p>
          <a href="#" class="card-link">Ver historial</a>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">👤</div>
          <h3>Mi Perfil</h3>
          <p class="card-description">Actualiza tu información</p>
          <a href="#" class="card-link">Editar perfil</a>
        </div>
      </div>

      <div class="calendar-section">
        <h2>Mis Citas</h2>
        <app-calendar
          [appointments]="patientAppointments"
          [userType]="'patient'"
          (dayClicked)="onDayClicked($event)">
        </app-calendar>
      </div>

      <div class="recent-activity">
        <h2>Actividad Reciente</h2>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">✅</div>
            <div class="activity-content">
              <p><strong>Cita completada</strong> con Dr. Juan Pérez</p>
              <span class="activity-date">Hace 2 días</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">📅</div>
            <div class="activity-content">
              <p><strong>Cita programada</strong> con Dra. María García</p>
              <span class="activity-date">Hace 1 semana</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .welcome-section {
      margin-bottom: 2rem;
    }

    .welcome-section h1 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .welcome-section p {
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .dashboard-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .dashboard-card:hover {
      transform: translateY(-5px);
    }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .dashboard-card h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .card-number {
      font-size: 2rem;
      font-weight: bold;
      color: #3498db;
      margin-bottom: 1rem;
    }

    .card-description {
      color: #7f8c8d;
      margin-bottom: 1rem;
    }

    .card-link {
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
    }

    .card-link:hover {
      text-decoration: underline;
    }

    .calendar-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .calendar-section h2 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }

    .recent-activity {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .recent-activity h2 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .activity-icon {
      font-size: 1.5rem;
    }

    .activity-content p {
      margin: 0;
      color: #2c3e50;
    }

    .activity-date {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
  `]
})
export class PatientDashboardComponent implements OnInit {
  patientName = 'Ana López';
  upcomingAppointments = 2;
  availableDoctors = 15;
  patientAppointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadPatientAppointments();
  }

    loadPatientAppointments(): void {
    // Simular carga de citas del paciente actual (ID 1)
    this.appointmentService.getAppointmentsByPatient(1).subscribe(appointments => {
      this.patientAppointments = appointments;
      this.upcomingAppointments = this.patientAppointments.filter(app =>
        new Date(app.date) > new Date() && app.status !== 'cancelled'
      ).length;
    });
  }

  onDayClicked(day: CalendarDay): void {
    if (day.appointments.length > 0) {
      console.log('Citas del día:', day.appointments);
      // Aquí podrías abrir un modal con los detalles de las citas
    }
  }
}
