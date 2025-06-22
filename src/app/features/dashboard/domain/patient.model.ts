export interface Patient {
  id: string;
  name: string;
  lastName: string;
  dni: string;
  birthDate: string;
  email: string;
  phone: string;
  photoUrl?: string;
  diagnosis?: string;
  diagnosisDate?: string;
  medication?: string;
  appointments?: Appointment[];
  notes?: Array<{
    text: string;
    date: string;
  }>;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  startDate: string;
  endDate: string;
  schedule: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
  };
  instructions: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Diagnosis {
  id: string;
  condition: string;
  diagnosisDate: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  symptoms: string[];
  treatment: string;
  notes: string;
  tasks: DiagnosisTask[];
}

export interface DiagnosisTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Note {
  id: string;
  date: string;
  content: string;
  type: 'general' | 'progress' | 'treatment';
}
