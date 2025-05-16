export interface Medication {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  interval: string;
  quantity: number;
  status: string;
  patientId: string;
  dosage: string;
  sideEffects: string[];
}
