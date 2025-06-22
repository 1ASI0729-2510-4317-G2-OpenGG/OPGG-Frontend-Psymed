import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../domain/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private readonly STORAGE_KEY = 'patients';
  private readonly UNAVAILABLE_DATES_KEY = 'unavailableDates';
  private patientsSubject = new BehaviorSubject<Patient[]>([]);
  patients$ = this.patientsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedPatients = localStorage.getItem(this.STORAGE_KEY);
    if (storedPatients) {
      const patients = JSON.parse(storedPatients).map((patient: any) => ({
        ...patient,
        birthDate: new Date(patient.birthDate),
        diagnosisDate: patient.diagnosisDate ? new Date(patient.diagnosisDate) : null,
        notes: patient.notes?.map((note: any) => ({
          ...note,
          date: new Date(note.date)
        })) || [],
        appointments: patient.appointments?.map((appointment: any) => ({
          ...appointment,
          date: new Date(appointment.date)
        })) || []
      }));
      this.patientsSubject.next(patients);
    }
  }

  private saveToLocalStorage(patients: Patient[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(patients));
    this.patientsSubject.next(patients);
  }

  getPatients(): Observable<Patient[]> {
    return this.patients$;
  }

  getPatientById(id: string): Patient | undefined {
    return this.patientsSubject.value.find(patient => patient.id === id);
  }

  addPatient(patient: Patient): void {
    const currentPatients = this.patientsSubject.value;
    this.saveToLocalStorage([...currentPatients, patient]);
  }

  updatePatient(updatedPatient: Patient): void {
    const currentPatients = this.patientsSubject.value;
    const index = currentPatients.findIndex(p => p.id === updatedPatient.id);
    if (index !== -1) {
      currentPatients[index] = updatedPatient;
      this.saveToLocalStorage(currentPatients);
    }
  }

  deletePatient(id: string): void {
    const currentPatients = this.patientsSubject.value;
    this.saveToLocalStorage(currentPatients.filter(patient => patient.id !== id));
  }

  getUnavailableDates(): Date[] {
    const datesJson = localStorage.getItem(this.UNAVAILABLE_DATES_KEY);
    const dates = datesJson ? JSON.parse(datesJson) : [];
    return dates.map((dateStr: string) => new Date(dateStr));
  }

  addUnavailableDate(date: Date) {
    const dates = this.getUnavailableDates();
    dates.push(date);
    localStorage.setItem(this.UNAVAILABLE_DATES_KEY, JSON.stringify(dates.map(d => d.toISOString())));
  }

  removeUnavailableDate(date: Date) {
    const dates = this.getUnavailableDates();
    const filteredDates = dates.filter(d =>
      d.getFullYear() !== date.getFullYear() ||
      d.getMonth() !== date.getMonth() ||
      d.getDate() !== date.getDate()
    );
    localStorage.setItem(this.UNAVAILABLE_DATES_KEY, JSON.stringify(filteredDates.map(d => d.toISOString())));
  }
}
