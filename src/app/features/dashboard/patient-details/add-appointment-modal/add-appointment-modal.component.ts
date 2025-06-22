import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';

interface DialogData {
  existingAppointments: Array<{
    date: Date;
    time: string;
    reason: string;
  }>;
}

@Component({
  selector: 'app-add-appointment-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  template: `
    <div class="modal-container">
      <h2 mat-dialog-title>Agendar Cita</h2>

      <mat-dialog-content class="modal-content">
        <div class="modal-grid">
          <!-- Formulario -->
          <div class="form-section">
            <div class="form-grid">
              <mat-form-field appearance="outline">
                <mat-label>Fecha de la cita</mat-label>
                <input matInput [matDatepicker]="picker" [(ngModel)]="appointment.date"
                       [matDatepickerFilter]="dateFilter">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Hora</mat-label>
                <input matInput type="time" [(ngModel)]="appointment.time">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Motivo de la cita</mat-label>
                <input matInput [(ngModel)]="appointment.reason"
                       placeholder="Ej: Consulta de seguimiento">
              </mat-form-field>
            </div>
          </div>

          <!-- Calendario -->
          <div class="calendar-section">
            <div class="calendar-header">
              <mat-icon>event_busy</mat-icon>
              <h3>Días no disponibles</h3>
            </div>
            <mat-calendar
              [selected]="appointment.date"
              (selectedChange)="appointment.date = $event"
              [dateClass]="dateClass">
            </mat-calendar>
            <div class="calendar-legend">
              <div class="legend-item">
                <div class="legend-color available"></div>
                <span>Disponible</span>
              </div>
              <div class="legend-item">
                <div class="legend-color booked"></div>
                <span>Con cita</span>
              </div>
              <div class="legend-item">
                <div class="legend-color unavailable"></div>
                <span>No disponible</span>
              </div>
            </div>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button mat-raised-button color="primary"
                (click)="onSubmit()"
                [disabled]="!isValid()">
          Agendar
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .modal-container {
      padding: 0;
      width: 700px;
      max-height: 80vh;
      display: flex;
      flex-direction: column;
    }

    h2 {
      margin: 0;
      padding: 1rem;
      color: #0a192f;
      font-size: 1.25rem;
      border-bottom: 1px solid #e0e0e0;
      flex-shrink: 0;
    }

    .modal-content {
      padding: 1rem;
      overflow-y: auto;
      flex-grow: 1;
    }

    .modal-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      align-items: start;
      min-height: min-content;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .calendar-section {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 8px;
      height: fit-content;
    }

    .calendar-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      color: #0a192f;

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
      }
    }

    .calendar-legend {
      margin-top: 0.75rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;

          &.available {
            background-color: #fff;
            border: 1px solid #ddd;
          }

          &.booked {
            background-color: #f44336;
          }

          &.unavailable {
            background-color: #9e9e9e;
          }
        }

        span {
          font-size: 0.8rem;
          color: #666;
        }
      }
    }

    mat-dialog-actions {
      padding: 0.75rem 1rem;
      border-top: 1px solid #e0e0e0;
      margin: 0;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    ::ng-deep {
      .mat-calendar {
        height: auto;
      }

      .mat-calendar-body-cell {
        &.booked .mat-calendar-body-cell-content {
          background-color: #ffebee !important;
          border: 1px solid #ef9a9a !important;
        }

        &.unavailable .mat-calendar-body-cell-content {
          background-color: #f5f5f5 !important;
          border: 1px solid #e0e0e0 !important;
          color: #9e9e9e !important;
        }
      }
    }

    @media (max-width: 700px) {
      .modal-container {
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
      }

      .modal-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AddAppointmentModalComponent {
  appointment = {
    date: null as Date | null,
    time: '',
    reason: ''
  };

  constructor(
    private dialogRef: MatDialogRef<AddAppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private patientService: PatientService
  ) {}

  isValid(): boolean {
    return !!(this.appointment.date &&
              this.appointment.time &&
              this.appointment.reason.trim());
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    return !this.isDateBooked(date) && !this.isDateUnavailable(date);
  };

  dateClass = (date: Date): string => {
    if (this.isDateBooked(date)) return 'booked';
    if (this.isDateUnavailable(date)) return 'unavailable';
    return '';
  };

  isDateBooked(date: Date): boolean {
    return this.data.existingAppointments.some(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.getFullYear() === date.getFullYear() &&
             appointmentDate.getMonth() === date.getMonth() &&
             appointmentDate.getDate() === date.getDate();
    });
  }

  isDateUnavailable(date: Date): boolean {
    return this.patientService.getUnavailableDates().some(unavailableDate =>
      unavailableDate.getFullYear() === date.getFullYear() &&
      unavailableDate.getMonth() === date.getMonth() &&
      unavailableDate.getDate() === date.getDate()
    );
  }

  onSubmit(): void {
    if (this.isValid()) {
      this.dialogRef.close(this.appointment);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
