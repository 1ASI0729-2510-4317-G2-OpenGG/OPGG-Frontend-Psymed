export class Appointment {
  id: number;
  patientId: number;
  medicId: number;
  patientName: string;
  medicName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(appointment: {
    id?: number;
    patientId: number;
    medicId: number;
    patientName: string;
    medicName: string;
    specialty: string;
    date: string;
    time: string;
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    reason: string;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = appointment.id || 0;
    this.patientId = appointment.patientId;
    this.medicId = appointment.medicId;
    this.patientName = appointment.patientName;
    this.medicName = appointment.medicName;
    this.specialty = appointment.specialty;
    this.date = appointment.date;
    this.time = appointment.time;
    this.status = appointment.status || 'pending';
    this.reason = appointment.reason;
    this.notes = appointment.notes;
    this.createdAt = appointment.createdAt || new Date();
    this.updatedAt = appointment.updatedAt || new Date();
  }

  getFormattedDateTime(): string {
    return `${this.date} a las ${this.time}`;
  }

  isUpcoming(): boolean {
    const appointmentDate = new Date(`${this.date} ${this.time}`);
    return appointmentDate > new Date();
  }

  getStatusText(): string {
    const statusMap = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };
    return statusMap[this.status];
  }
}
