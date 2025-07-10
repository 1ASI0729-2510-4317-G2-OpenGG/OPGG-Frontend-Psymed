import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="appointments-container">
      <h1>Mis Citas</h1>
      <p>Aquí verás todas tus citas médicas</p>

      <div class="appointments-list">
        <div class="appointment-card">
          <h3>Dr. Juan Pérez - Cardiología</h3>
          <p>Fecha: 15 de Enero, 2024</p>
          <p>Hora: 09:00 AM</p>
          <span class="status confirmed">Confirmada</span>
        </div>

        <div class="appointment-card">
          <h3>Dra. María García - Pediatría</h3>
          <p>Fecha: 20 de Enero, 2024</p>
          <p>Hora: 10:30 AM</p>
          <span class="status pending">Pendiente</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .appointments-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .appointments-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }

    .appointment-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .status.confirmed {
      background: #d4edda;
      color: #155724;
    }

    .status.pending {
      background: #fff3cd;
      color: #856404;
    }
  `]
})
export class PatientAppointmentsComponent {}
