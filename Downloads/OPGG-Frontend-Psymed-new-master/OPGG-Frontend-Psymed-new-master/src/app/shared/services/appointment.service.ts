import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment } from '../model/appointment.entity';
import { BaseService } from './base.service';

/**
 * Servicio para la gestión de citas médicas
 *
 * Funcionalidades:
 * - CRUD completo de citas
 * - Filtrado por paciente y médico
 * - Gestión de horarios disponibles
 * - Estados de citas (pendiente, confirmada, completada, cancelada)
 * - Validación de disponibilidad
 *
 * @example
 * ```typescript
 * // Obtener citas de un paciente
 * this.appointmentService.getAppointmentsByPatient(patientId)
 *   .subscribe(appointments => {
 *     this.patientAppointments = appointments;
 *   });
 * ```
 */

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseService<Appointment> {

  constructor() {
    super();
    this.resourceEndpoint = '/appointments';
  }

  // Datos de prueba
  private mockAppointments: Appointment[] = [
    new Appointment({
      id: 1,
      patientId: 1,
      medicId: 1,
      patientName: 'Ana López',
      medicName: 'Dr. Juan Pérez',
      specialty: 'Cardiología',
      date: '2024-01-15',
      time: '09:00',
      status: 'confirmed',
      reason: 'Consulta general',
      notes: 'Paciente con antecedentes de hipertensión'
    }),
    new Appointment({
      id: 2,
      patientId: 2,
      medicId: 1,
      patientName: 'Luis Martínez',
      medicName: 'Dr. Juan Pérez',
      specialty: 'Cardiología',
      date: '2024-01-15',
      time: '10:30',
      status: 'confirmed',
      reason: 'Seguimiento',
      notes: 'Control post-operatorio'
    }),
    new Appointment({
      id: 3,
      patientId: 3,
      medicId: 2,
      patientName: 'Sofia Hernández',
      medicName: 'Dra. María García',
      specialty: 'Pediatría',
      date: '2024-01-15',
      time: '14:00',
      status: 'pending',
      reason: 'Primera consulta',
      notes: 'Paciente pediátrico de 8 años'
    }),
    new Appointment({
      id: 4,
      patientId: 1,
      medicId: 2,
      patientName: 'Ana López',
      medicName: 'Dra. María García',
      specialty: 'Pediatría',
      date: '2024-01-20',
      time: '10:30',
      status: 'pending',
      reason: 'Consulta de seguimiento',
      notes: ''
    })
  ];

  // Obtener todas las citas
  getAllAppointments(): Observable<Appointment[]> {
    return of(this.mockAppointments);
  }

  /**
   * Obtiene todas las citas de un paciente específico
   * @param patientId ID del paciente
   * @returns Observable con array de citas del paciente
   */
  getAppointmentsByPatient(patientId: number): Observable<Appointment[]> {
    const patientAppointments = this.mockAppointments.filter(
      appointment => appointment.patientId === patientId
    );
    return of(patientAppointments);
  }

  /**
   * Obtiene todas las citas de un médico específico
   * @param medicId ID del médico
   * @returns Observable con array de citas del médico
   */
  getAppointmentsByMedic(medicId: number): Observable<Appointment[]> {
    const medicAppointments = this.mockAppointments.filter(
      appointment => appointment.medicId === medicId
    );
    return of(medicAppointments);
  }

  // Obtener médicos disponibles
  getAvailableMedics(): Observable<any[]> {
    const medics = [
      { id: 1, name: 'Dr. Juan Pérez', specialty: 'Cardiología', email: 'juan.perez@hospital.com' },
      { id: 2, name: 'Dra. María García', specialty: 'Pediatría', email: 'maria.garcia@hospital.com' },
      { id: 3, name: 'Dr. Carlos Rodríguez', specialty: 'Neurología', email: 'carlos.rodriguez@hospital.com' }
    ];
    return of(medics);
  }

  // Crear nueva cita
  createAppointment(appointment: Appointment): Observable<Appointment> {
    const newId = Math.max(...this.mockAppointments.map(a => a.id)) + 1;
    appointment.id = newId;
    appointment.createdAt = new Date();
    appointment.updatedAt = new Date();

    this.mockAppointments.push(appointment);
    return of(appointment);
  }

  // Actualizar cita
  updateAppointment(id: number, appointmentData: Partial<Appointment>): Observable<Appointment> {
    const index = this.mockAppointments.findIndex(a => a.id === id);
    if (index !== -1) {
      // Actualizar solo las propiedades básicas para evitar conflictos de tipos
      if (appointmentData.status) {
        this.mockAppointments[index].status = appointmentData.status;
      }
      if (appointmentData.notes) {
        this.mockAppointments[index].notes = appointmentData.notes;
      }
      if (appointmentData.date) {
        this.mockAppointments[index].date = appointmentData.date;
      }
      if (appointmentData.time) {
        this.mockAppointments[index].time = appointmentData.time;
      }
      this.mockAppointments[index].updatedAt = new Date();
      return of(this.mockAppointments[index]);
    }
    throw new Error('Cita no encontrada');
  }

  // Cancelar cita
  cancelAppointment(id: number): Observable<Appointment> {
    return this.updateAppointment(id, { status: 'cancelled' });
  }

  // Confirmar cita
  confirmAppointment(id: number): Observable<Appointment> {
    return this.updateAppointment(id, { status: 'confirmed' });
  }

  // Completar cita
  completeAppointment(id: number, notes?: string): Observable<Appointment> {
    return this.updateAppointment(id, { status: 'completed', notes });
  }

  /**
   * Obtiene los horarios disponibles para un médico en una fecha específica
   * @param medicId ID del médico
   * @param date Fecha en formato YYYY-MM-DD
   * @returns Observable con array de horarios disponibles en formato HH:MM
   */
  getAvailableTimeSlots(medicId: number, date: string): Observable<string[]> {
    const allSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
    ];

    const bookedSlots = this.mockAppointments
      .filter(appointment =>
        appointment.medicId === medicId &&
        appointment.date === date &&
        appointment.status !== 'cancelled'
      )
      .map(appointment => appointment.time);

    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    return of(availableSlots);
  }
}
