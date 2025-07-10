import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medic-appointments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="appointments-container">
      <h1>Mi Agenda</h1>
      <p>Gestiona tus citas médicas</p>

      <div class="appointments-list">
        <div class="appointment-card">
          <h3>Ana López</h3>
          <p>Consulta general</p>
          <p>Fecha: 15 de Enero, 2024</p>
          <p>Hora: 09:00 AM</p>
          <span class="status confirmed">Confirmada</span>
        </div>

        <div class="appointment-card">
          <h3>Luis Martínez</h3>
          <p>Seguimiento</p>
          <p>Fecha: 15 de Enero, 2024</p>
          <p>Hora: 10:30 AM</p>
          <span class="status confirmed">Confirmada</span>
        </div>

        <div class="appointment-card">
          <h3>Sofia Hernández</h3>
          <p>Primera consulta</p>
          <p>Fecha: 15 de Enero, 2024</p>
          <p>Hora: 14:00 PM</p>
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
export class MedicAppointmentsComponent {}
