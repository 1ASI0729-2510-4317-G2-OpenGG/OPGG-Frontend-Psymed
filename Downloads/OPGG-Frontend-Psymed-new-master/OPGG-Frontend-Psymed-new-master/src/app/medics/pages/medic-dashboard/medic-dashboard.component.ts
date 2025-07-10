import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CalendarComponent, CalendarDay } from '../../../shared/components/calendar/calendar.component';
import { Appointment } from '../../../shared/model/appointment.entity';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { MedicService } from '../../services/medic.service';

@Component({
  selector: 'app-medic-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CalendarComponent],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h1>Bienvenido, {{ medicName }}!</h1>
        <p>Panel de control del médico - {{ specialty }}</p>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-icon">📅</div>
          <h3>Citas de Hoy</h3>
          <p class="card-number">{{ todayAppointments }}</p>
          <a routerLink="/medic/appointments" class="card-link">Ver agenda</a>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">👥</div>
          <h3>Pacientes Activos</h3>
          <p class="card-number">{{ activePatients }}</p>
          <a href="#" class="card-link">Ver pacientes</a>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">⏰</div>
          <h3>Próxima Cita</h3>
          <p class="card-description">{{ nextAppointment }}</p>
          <a href="#" class="card-link">Ver detalles</a>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">📊</div>
          <h3>Estadísticas</h3>
          <p class="card-description">Rendimiento mensual</p>
          <a href="#" class="card-link">Ver reportes</a>
        </div>
      </div>

      <div class="calendar-section">
        <h2>Mi Agenda</h2>
        <app-calendar
          [appointments]="medicAppointments"
          [availability]="medicAvailability"
          [userType]="'medic'"
          (dayClicked)="onDayClicked($event)">
        </app-calendar>
      </div>

      <div class="dashboard-sections">
        <div class="section">
          <h2>Citas Pendientes</h2>
          <div class="appointment-list">
            <div class="appointment-item">
              <div class="appointment-time">09:00</div>
              <div class="appointment-info">
                <p><strong>Ana López</strong></p>
                <span>Consulta general</span>
              </div>
              <div class="appointment-status pending">Pendiente</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-time">10:30</div>
              <div class="appointment-info">
                <p><strong>Luis Martínez</strong></p>
                <span>Seguimiento</span>
              </div>
              <div class="appointment-status confirmed">Confirmada</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-time">14:00</div>
              <div class="appointment-info">
                <p><strong>Sofia Hernández</strong></p>
                <span>Primera consulta</span>
              </div>
              <div class="appointment-status confirmed">Confirmada</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Acciones Rápidas</h2>
          <div class="quick-actions">
            <button class="action-btn">📝 Nueva Receta</button>
            <button class="action-btn">📋 Historial Paciente</button>
            <button class="action-btn">⚙️ Configurar Horario</button>
            <button class="action-btn">📊 Ver Estadísticas</button>
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
      color: #27ae60;
      margin-bottom: 1rem;
    }

    .card-description {
      color: #7f8c8d;
      margin-bottom: 1rem;
    }

    .card-link {
      color: #27ae60;
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

    .dashboard-sections {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .section h2 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }

    .appointment-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .appointment-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 6px;
      border-left: 4px solid #27ae60;
    }

    .appointment-time {
      font-weight: bold;
      color: #2c3e50;
      min-width: 60px;
    }

    .appointment-info {
      flex: 1;
    }

    .appointment-info p {
      margin: 0;
      color: #2c3e50;
    }

    .appointment-info span {
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .appointment-status {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .appointment-status.pending {
      background: #fff3cd;
      color: #856404;
    }

    .appointment-status.confirmed {
      background: #d4edda;
      color: #155724;
    }

    .quick-actions {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .action-btn {
      padding: 1rem;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;
    }

    .action-btn:hover {
      background: #e9ecef;
      border-color: #27ae60;
    }

    @media (max-width: 768px) {
      .dashboard-sections {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MedicDashboardComponent implements OnInit {
  medicName = 'Dr. Juan Pérez';
  specialty = 'Cardiología';
  todayAppointments = 8;
  activePatients = 45;
  nextAppointment = '09:00 - Ana López';
  medicAppointments: Appointment[] = [];
  medicAvailability: { [key: string]: boolean } = {};

  constructor(
    private appointmentService: AppointmentService,
    private medicService: MedicService
  ) {}

  ngOnInit(): void {
    this.loadMedicData();
  }

  loadMedicData(): void {
    // Simular carga de citas del médico actual (ID 1)
    this.appointmentService.getAppointmentsByMedic(1).subscribe(appointments => {
      this.medicAppointments = appointments;
      this.todayAppointments = this.medicAppointments.filter(app => {
        const today = new Date();
        const appointmentDate = new Date(app.date);
        return appointmentDate.toDateString() === today.toDateString();
      }).length;
    });

    // Simular disponibilidad del médico
    this.generateMedicAvailability();
  }

  generateMedicAvailability(): void {
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];

      // Simular disponibilidad (lunes a viernes)
      const dayOfWeek = date.getDay();
      this.medicAvailability[dateKey] = dayOfWeek >= 1 && dayOfWeek <= 5;
    }
  }

  onDayClicked(day: CalendarDay): void {
    if (day.appointments.length > 0) {
      console.log('Citas del día:', day.appointments);
      // Aquí podrías abrir un modal con los detalles de las citas
    } else if (day.isAvailable) {
      console.log('Día disponible para citas');
      // Aquí podrías permitir configurar disponibilidad
    }
  }
}
