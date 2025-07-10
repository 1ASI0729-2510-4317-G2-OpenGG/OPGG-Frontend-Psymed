import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../model/appointment.entity';

@Component({
  selector: 'app-appointment-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="appointments-container">
      <div class="header">
        <h1>Gestión de Citas</h1>
        <p>Administra todas las citas del sistema</p>
      </div>

      <div class="appointments-list">
        <div *ngFor="let appointment of appointments" class="appointment-card">
          <div class="appointment-header">
            <div class="appointment-info">
              <h3>{{ appointment.patientName }}</h3>
              <p><strong>Médico:</strong> {{ appointment.medicName }}</p>
              <p><strong>Especialidad:</strong> {{ appointment.specialty }}</p>
            </div>
            <div class="appointment-status">
              <span class="status-badge" [class]="'status-' + appointment.status">
                {{ appointment.getStatusText() }}
              </span>
            </div>
          </div>

          <div class="appointment-details">
            <div class="detail-item">
              <strong>Fecha:</strong> {{ appointment.date }}
            </div>
            <div class="detail-item">
              <strong>Hora:</strong> {{ appointment.time }}
            </div>
            <div class="detail-item">
              <strong>Motivo:</strong> {{ appointment.reason }}
            </div>
            <div class="detail-item" *ngIf="appointment.notes">
              <strong>Notas:</strong> {{ appointment.notes }}
            </div>
          </div>

          <div class="appointment-actions">
            <button class="btn-action btn-primary" (click)="viewDetails(appointment)">
              👁️ Ver Detalles
            </button>
            <button class="btn-action btn-success" (click)="confirmAppointment(appointment)"
                    *ngIf="appointment.status === 'pending'">
              ✅ Confirmar
            </button>
            <button class="btn-action btn-warning" (click)="rescheduleAppointment(appointment)">
              📅 Reprogramar
            </button>
            <button class="btn-action btn-danger" (click)="cancelAppointment(appointment)">
              ❌ Cancelar
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="appointments.length === 0" class="empty-state">
        <div class="empty-icon">📅</div>
        <h2>No hay citas registradas</h2>
        <p>Las citas aparecerán aquí cuando se programen</p>
      </div>
    </div>
  `,
  styles: [`
    .appointments-container {
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

    .appointments-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .appointment-card {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .appointment-card:hover {
      transform: translateY(-2px);
    }

    .appointment-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e9ecef;
    }

    .appointment-info h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .appointment-info p {
      color: #7f8c8d;
      margin-bottom: 0.25rem;
    }

    .status-badge {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-pending {
      background: #fff3cd;
      color: #856404;
    }

    .status-confirmed {
      background: #d4edda;
      color: #155724;
    }

    .status-completed {
      background: #d1ecf1;
      color: #0c5460;
    }

    .status-cancelled {
      background: #f8d7da;
      color: #721c24;
    }

    .appointment-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .detail-item {
      color: #2c3e50;
    }

    .detail-item strong {
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .appointment-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn-action {
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      flex: 1;
      min-width: 120px;
    }

    .btn-primary {
      background: #3498db;
      color: white;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    .btn-success {
      background: #27ae60;
      color: white;
    }

    .btn-success:hover {
      background: #219a52;
    }

    .btn-warning {
      background: #f39c12;
      color: white;
    }

    .btn-warning:hover {
      background: #e67e22;
    }

    .btn-danger {
      background: #e74c3c;
      color: white;
    }

    .btn-danger:hover {
      background: #c0392b;
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
      .appointments-container {
        padding: 1rem;
      }

      .appointment-header {
        flex-direction: column;
        gap: 1rem;
      }

      .appointment-details {
        grid-template-columns: 1fr;
      }

      .appointment-actions {
        flex-direction: column;
      }
    }
  `]
})
export class AppointmentManagementComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  private loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(
      appointments => {
        this.appointments = appointments;
      }
    );
  }

  viewDetails(appointment: Appointment): void {
    console.log('Ver detalles de:', appointment);
    // Implementar vista de detalles
  }

  confirmAppointment(appointment: Appointment): void {
    this.appointmentService.confirmAppointment(appointment.id).subscribe(
      updatedAppointment => {
        this.loadAppointments();
        console.log('Cita confirmada:', updatedAppointment);
      }
    );
  }

  rescheduleAppointment(appointment: Appointment): void {
    console.log('Reprogramar cita:', appointment);
    // Implementar lógica de reprogramación
  }

  cancelAppointment(appointment: Appointment): void {
    if (confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      this.appointmentService.cancelAppointment(appointment.id).subscribe(
        updatedAppointment => {
          this.loadAppointments();
          console.log('Cita cancelada:', updatedAppointment);
        }
      );
    }
  }
}
