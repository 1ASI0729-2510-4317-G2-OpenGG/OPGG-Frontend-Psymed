export class Prescription {
  id: number;
  patientId: number;
  medicId: number;
  appointmentId: number;
  patientName: string;
  medicName: string;
  medications: Medication[];
  instructions: string;
  diagnosis: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(prescription: {
    id?: number;
    patientId: number;
    medicId: number;
    appointmentId: number;
    patientName: string;
    medicName: string;
    medications: Medication[];
    instructions: string;
    diagnosis: string;
    date: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = prescription.id || 0;
    this.patientId = prescription.patientId;
    this.medicId = prescription.medicId;
    this.appointmentId = prescription.appointmentId;
    this.patientName = prescription.patientName;
    this.medicName = prescription.medicName;
    this.medications = prescription.medications;
    this.instructions = prescription.instructions;
    this.diagnosis = prescription.diagnosis;
    this.date = prescription.date;
    this.createdAt = prescription.createdAt || new Date();
    this.updatedAt = prescription.updatedAt || new Date();
  }

  getFormattedDate(): string {
    return new Date(this.date).toLocaleDateString('es-ES');
  }

  getTotalMedications(): number {
    return this.medications.length;
  }
}

export class Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;

  constructor(medication: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }) {
    this.name = medication.name;
    this.dosage = medication.dosage;
    this.frequency = medication.frequency;
    this.duration = medication.duration;
    this.instructions = medication.instructions;
  }

  getFormattedDosage(): string {
    return `${this.dosage} - ${this.frequency} por ${this.duration}`;
  }
}
