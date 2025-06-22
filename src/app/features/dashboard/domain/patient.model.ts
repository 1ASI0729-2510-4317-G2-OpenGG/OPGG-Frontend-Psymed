export interface Patient {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  dni: string;
  photoUrl?: string;
  notes?: Note[];
  appointments?: Appointment[];
  diagnoses?: Diagnosis[];
  medications?: Medication[];
  favorite?: boolean;
}

export interface Note {
  id: string;
  text: string;
  date: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
}

export interface DiagnosisTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Diagnosis {
  id: string;
  description: string;
  diagnosisDate: string;
  tasks: DiagnosisTask[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: number;
  frequencyUnit: string;
  duration: string;
  instructions?: string;
  startDate: string;
}
