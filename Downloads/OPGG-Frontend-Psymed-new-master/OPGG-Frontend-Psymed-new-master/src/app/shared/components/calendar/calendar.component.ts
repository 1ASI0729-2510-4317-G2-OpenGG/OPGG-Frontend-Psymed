import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../model/appointment.entity';

/**
 * Componente de calendario reutilizable para el sistema de citas médicas
 *
 * Características:
 * - Visualización mensual con navegación
 * - Soporte para citas de pacientes y médicos
 * - Indicadores de disponibilidad
 * - Estados visuales para diferentes tipos de citas
 * - Responsive design
 *
 * @example
 * ```html
 * <app-calendar
 *   [appointments]="appointments"
 *   [availability]="availability"
 *   [userType]="'patient'"
 *   (dayClicked)="onDayClicked($event)">
 * </app-calendar>
 * ```
 */

/**
 * Interfaz que representa un día en el calendario
 */
export interface CalendarDay {
  /** Fecha del día */
  date: Date;
  /** Indica si el día pertenece al mes actual */
  isCurrentMonth: boolean;
  /** Indica si es el día actual */
  isToday: boolean;
  /** Lista de citas para este día */
  appointments: Appointment[];
  /** Indica si el médico está disponible este día (solo para médicos) */
  isAvailable?: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar-container">
      <div class="calendar-header">
        <button class="nav-btn" (click)="previousMonth()">&lt;</button>
        <h3>{{ getMonthYear() }}</h3>
        <button class="nav-btn" (click)="nextMonth()">&gt;</button>
      </div>

      <div class="calendar-grid">
        <div class="day-header" *ngFor="let day of dayHeaders">{{ day }}</div>

        <div
          *ngFor="let day of calendarDays"
          class="calendar-day"
          [class.other-month]="!day.isCurrentMonth"
          [class.today]="day.isToday"
          [class.has-appointments]="day.appointments.length > 0"
          [class.available]="day.isAvailable"
          (click)="onDayClick(day)"
        >
          <div class="day-number">{{ day.date.getDate() }}</div>

          <div class="appointments" *ngIf="day.appointments.length > 0">
            <div
              *ngFor="let appointment of day.appointments.slice(0, 2)"
              class="appointment-item"
              [class.confirmed]="appointment.status === 'confirmed'"
              [class.pending]="appointment.status === 'pending'"
              [class.cancelled]="appointment.status === 'cancelled'"
            >
              <span class="appointment-time">{{ formatTime(appointment.time) }}</span>
              <span class="appointment-title">{{ getAppointmentTitle(appointment) }}</span>
            </div>
            <div *ngIf="day.appointments.length > 2" class="more-appointments">
              +{{ day.appointments.length - 2 }} más
            </div>
          </div>

          <div class="availability-indicator" *ngIf="day.isAvailable && day.appointments.length === 0">
            <span class="available-text">Disponible</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
      margin: 20px 0;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .nav-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .nav-btn:hover {
      background: #0056b3;
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }

    .day-header {
      background: #f8f9fa;
      padding: 10px;
      text-align: center;
      font-weight: bold;
      font-size: 12px;
      color: #666;
    }

    .calendar-day {
      background: white;
      min-height: 100px;
      padding: 8px;
      cursor: pointer;
      position: relative;
      transition: background-color 0.2s;
    }

    .calendar-day:hover {
      background: #f8f9fa;
    }

    .calendar-day.other-month {
      background: #f5f5f5;
      color: #ccc;
    }

    .calendar-day.today {
      background: #e3f2fd;
      border: 2px solid #007bff;
    }

    .calendar-day.has-appointments {
      background: #fff3cd;
    }

    .calendar-day.available {
      background: #d4edda;
    }

    .day-number {
      font-weight: bold;
      margin-bottom: 4px;
    }

    .appointments {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .appointment-item {
      background: #007bff;
      color: white;
      padding: 2px 4px;
      border-radius: 2px;
      font-size: 10px;
      display: flex;
      flex-direction: column;
    }

    .appointment-item.confirmed {
      background: #28a745;
    }

    .appointment-item.pending {
      background: #ffc107;
      color: #000;
    }

    .appointment-item.cancelled {
      background: #dc3545;
    }

    .appointment-time {
      font-weight: bold;
    }

    .appointment-title {
      font-size: 9px;
      opacity: 0.9;
    }

    .more-appointments {
      font-size: 9px;
      color: #666;
      font-style: italic;
    }

    .availability-indicator {
      position: absolute;
      bottom: 4px;
      right: 4px;
    }

    .available-text {
      font-size: 9px;
      color: #28a745;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .calendar-day {
        min-height: 80px;
        padding: 4px;
      }

      .appointment-item {
        font-size: 8px;
      }
    }
  `]
})
export class CalendarComponent implements OnInit {
  /** Array de citas a mostrar en el calendario */
  @Input() appointments: Appointment[] = [];

  /** Disponibilidad del médico por fecha (formato YYYY-MM-DD) */
  @Input() availability: { [key: string]: boolean } = {};

  /** Tipo de usuario que visualiza el calendario */
  @Input() userType: 'patient' | 'medic' = 'patient';

  /** Evento emitido cuando se hace clic en un día del calendario */
  @Output() dayClicked = new EventEmitter<CalendarDay>();

  /** Evento emitido cuando se hace clic en una cita específica */
  @Output() appointmentClicked = new EventEmitter<Appointment>();

  currentDate = new Date();
  calendarDays: CalendarDay[] = [];
  dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);

    // Primer día de la semana a mostrar
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // Último día de la semana a mostrar
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    this.calendarDays = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const dayAppointments = this.getAppointmentsForDate(current);
      const dateKey = this.formatDateKey(current);

      this.calendarDays.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === month,
        isToday: this.isToday(current),
        appointments: dayAppointments,
        isAvailable: this.userType === 'medic' ? this.availability[dateKey] : undefined
      });

      current.setDate(current.getDate() + 1);
    }
  }

  getAppointmentsForDate(date: Date): Appointment[] {
    return this.appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toDateString() === date.toDateString();
    });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  formatDateKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getMonthYear(): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  onDayClick(day: CalendarDay) {
    this.dayClicked.emit(day);
  }

  formatTime(time: string): string {
    return time.substring(0, 5);
  }

  getAppointmentTitle(appointment: Appointment): string {
    if (this.userType === 'patient') {
      return `Dr. ${appointment.medicName}`;
    } else {
      return appointment.patientName;
    }
  }
}
