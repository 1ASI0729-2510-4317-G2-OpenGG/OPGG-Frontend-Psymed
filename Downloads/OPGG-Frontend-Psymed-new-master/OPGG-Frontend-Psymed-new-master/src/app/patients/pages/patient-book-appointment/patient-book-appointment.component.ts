import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { Appointment } from '../../../shared/model/appointment.entity';

@Component({
  selector: 'app-patient-book-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="book-appointment-container">
      <div class="header">
        <h1>Reservar Nueva Cita</h1>
        <p>Selecciona un médico y horario para tu cita</p>
      </div>

      <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()" class="appointment-form">
        <div class="form-section">
          <h2>Información del Médico</h2>

          <div class="form-group">
            <label for="medicId">Seleccionar Médico:</label>
            <select formControlName="medicId" id="medicId" class="form-control" (change)="onMedicChange()">
              <option value="">Selecciona un médico</option>
              <option *ngFor="let medic of availableMedics" [value]="medic.id">
                {{ medic.name }} - {{ medic.specialty }}
              </option>
            </select>
            <div *ngIf="appointmentForm.get('medicId')?.invalid && appointmentForm.get('medicId')?.touched" class="error-message">
              Debes seleccionar un médico
            </div>
          </div>

          <div class="medic-info" *ngIf="selectedMedic">
            <div class="medic-card">
              <h3>{{ selectedMedic.name }}</h3>
              <p><strong>Especialidad:</strong> {{ selectedMedic.specialty }}</p>
              <p><strong>Email:</strong> {{ selectedMedic.email }}</p>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Fecha y Hora</h2>

          <div class="form-group">
            <label for="date">Fecha:</label>
            <input
              type="date"
              id="date"
              formControlName="date"
              class="form-control"
              [min]="minDate"
              (change)="onDateChange()">
            <div *ngIf="appointmentForm.get('date')?.invalid && appointmentForm.get('date')?.touched" class="error-message">
              Debes seleccionar una fecha
            </div>
          </div>

          <div class="form-group" *ngIf="availableTimeSlots.length > 0">
            <label for="time">Horario Disponible:</label>
            <div class="time-slots">
              <button
                *ngFor="let slot of availableTimeSlots"
                type="button"
                class="time-slot"
                [class.selected]="selectedTimeSlot === slot"
                (click)="selectTimeSlot(slot)">
                {{ slot }}
              </button>
            </div>
            <div *ngIf="appointmentForm.get('time')?.invalid && appointmentForm.get('time')?.touched" class="error-message">
              Debes seleccionar un horario
            </div>
          </div>

          <div class="no-slots" *ngIf="appointmentForm.get('date')?.value && appointmentForm.get('medicId')?.value && availableTimeSlots.length === 0">
            <p>No hay horarios disponibles para la fecha seleccionada</p>
          </div>
        </div>

        <div class="form-section">
          <h2>Información de la Cita</h2>

          <div class="form-group">
            <label for="reason">Motivo de la consulta:</label>
            <textarea
              id="reason"
              formControlName="reason"
              class="form-control"
              rows="3"
              placeholder="Describe brevemente el motivo de tu consulta"></textarea>
            <div *ngIf="appointmentForm.get('reason')?.invalid && appointmentForm.get('reason')?.touched" class="error-message">
              Debes indicar el motivo de la consulta
            </div>
          </div>

          <div class="form-group">
            <label for="notes">Notas adicionales (opcional):</label>
            <textarea
              id="notes"
              formControlName="notes"
              class="form-control"
              rows="2"
              placeholder="Información adicional que consideres relevante"></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="goBack()">Cancelar</button>
          <button type="submit" [disabled]="appointmentForm.invalid || isSubmitting" class="btn-primary">
            <span *ngIf="isSubmitting">Reservando...</span>
            <span *ngIf="!isSubmitting">Reservar Cita</span>
          </button>
        </div>
      </form>

      <div *ngIf="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  `,
  styles: [`
    .book-appointment-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .header p {
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    .appointment-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .form-section {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #e9ecef;
    }

    .form-section:last-child {
      border-bottom: none;
    }

    .form-section h2 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #3498db;
    }

    .medic-info {
      margin-top: 1rem;
    }

    .medic-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 6px;
      border-left: 4px solid #3498db;
    }

    .medic-card h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .medic-card p {
      color: #7f8c8d;
      margin-bottom: 0.25rem;
    }

    .time-slots {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .time-slot {
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .time-slot:hover {
      border-color: #3498db;
      background: #f8f9fa;
    }

    .time-slot.selected {
      border-color: #3498db;
      background: #3498db;
      color: white;
    }

    .no-slots {
      text-align: center;
      padding: 2rem;
      background: #fff3cd;
      border-radius: 6px;
      color: #856404;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #3498db;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #2980b9;
    }

    .btn-primary:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #e9ecef;
      color: #2c3e50;
    }

    .btn-secondary:hover {
      background: #dee2e6;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .success-message {
      background: #d4edda;
      color: #155724;
      padding: 1rem;
      border-radius: 6px;
      margin-top: 1rem;
      border: 1px solid #c3e6cb;
    }

    @media (max-width: 768px) {
      .book-appointment-container {
        padding: 1rem;
      }

      .time-slots {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class PatientBookAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  availableMedics: any[] = [];
  selectedMedic: any = null;
  availableTimeSlots: string[] = [];
  selectedTimeSlot: string = '';
  minDate: string = '';
  isSubmitting = false;
  successMessage = '';
  currentUser: any = null;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      medicId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', Validators.required],
      notes: ['']
    });

    // Establecer fecha mínima como hoy
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadAvailableMedics();
  }

  private loadCurrentUser(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  private loadAvailableMedics(): void {
    this.appointmentService.getAvailableMedics().subscribe(
      medics => {
        this.availableMedics = medics;
      }
    );
  }

  onMedicChange(): void {
    const medicId = this.appointmentForm.get('medicId')?.value;
    this.selectedMedic = this.availableMedics.find(m => m.id == medicId);
    this.availableTimeSlots = [];
    this.selectedTimeSlot = '';
    this.appointmentForm.get('time')?.setValue('');

    if (medicId && this.appointmentForm.get('date')?.value) {
      this.loadAvailableTimeSlots();
    }
  }

  onDateChange(): void {
    this.availableTimeSlots = [];
    this.selectedTimeSlot = '';
    this.appointmentForm.get('time')?.setValue('');

    if (this.appointmentForm.get('medicId')?.value && this.appointmentForm.get('date')?.value) {
      this.loadAvailableTimeSlots();
    }
  }

  private loadAvailableTimeSlots(): void {
    const medicId = this.appointmentForm.get('medicId')?.value;
    const date = this.appointmentForm.get('date')?.value;

    if (medicId && date) {
      this.appointmentService.getAvailableTimeSlots(medicId, date).subscribe(
        slots => {
          this.availableTimeSlots = slots;
        }
      );
    }
  }

  selectTimeSlot(slot: string): void {
    this.selectedTimeSlot = slot;
    this.appointmentForm.get('time')?.setValue(slot);
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.isSubmitting = true;

      const formData = this.appointmentForm.value;
      const appointment = new Appointment({
        patientId: this.currentUser.id || 1, // En un caso real vendría del usuario logueado
        medicId: formData.medicId,
        patientName: this.currentUser?.name || 'Ana López',
        medicName: this.selectedMedic.name,
        specialty: this.selectedMedic.specialty,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        notes: formData.notes,
        status: 'pending'
      });

      this.appointmentService.createAppointment(appointment).subscribe(
        response => {
          this.successMessage = 'Cita reservada exitosamente. Te contactaremos para confirmar la cita.';
          this.appointmentForm.reset();
          this.selectedMedic = null;
          this.availableTimeSlots = [];
          this.selectedTimeSlot = '';
          this.isSubmitting = false;

          setTimeout(() => {
            this.router.navigate(['/patient/appointments']);
          }, 2000);
        },
        error => {
          console.error('Error al reservar cita:', error);
          this.isSubmitting = false;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}
