export interface Professional {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  specialityId: number;
  licenseNumber: string;
  phone: string;
  profileImage?: string;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  profileImage?: string;
}

export interface Session {
  id: number;
  patientId: number;
  professionalId: number;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Treatment {
  id: number;
  patientId: number;
  professionalId: number;
  startDate: string;
  endDate?: string;
  description: string;
  status: 'active' | 'completed' | 'discontinued';
}

export interface Medication {
  id: number;
  name: string;
  description: string;
  dosageForm: string;
  manufacturer: string;
}

export interface Prescription {
  id: number;
  treatmentId: number;
  medicationId: number;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  instructions: string;
}

export interface PatientMood {
  id: number;
  patientId: number;
  date: string;
  mood: 'very_bad' | 'bad' | 'neutral' | 'good' | 'very_good';
  notes?: string;
}

export interface BiologicalFunction {
  id: number;
  patientId: number;
  date: string;
  sleep: number;
  appetite: number;
  energy: number;
  notes?: string;
}

export interface ClinicalHistory {
  id: number;
  patientId: number;
  professionalId: number;
  date: string;
  diagnosis: string;
  observations: string;
  recommendations: string;
}
