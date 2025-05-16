import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Patient, PatientMood, BiologicalFunction } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private endpoint = '/patients';

  constructor(private api: ApiService) {}

  getPatients(): Observable<Patient[]> {
    return this.api.get<Patient[]>(this.endpoint);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.api.get<Patient>(`${this.endpoint}/${id}`);
  }

  createPatient(data: Partial<Patient>): Observable<Patient> {
    return this.api.post<Patient>(this.endpoint, data);
  }

  updatePatient(id: number, data: Partial<Patient>): Observable<Patient> {
    return this.api.put<Patient>(`${this.endpoint}/${id}`, data);
  }

  // Mood tracking
  getPatientMoods(patientId: number): Observable<PatientMood[]> {
    return this.api.get<PatientMood[]>(`/patientMoods?patientId=${patientId}`);
  }

  addPatientMood(data: Partial<PatientMood>): Observable<PatientMood> {
    return this.api.post<PatientMood>('/patientMoods', data);
  }

  // Biological functions
  getBiologicalFunctions(patientId: number): Observable<BiologicalFunction[]> {
    return this.api.get<BiologicalFunction[]>(`/biologicalFunctions?patientId=${patientId}`);
  }

  addBiologicalFunction(data: Partial<BiologicalFunction>): Observable<BiologicalFunction> {
    return this.api.post<BiologicalFunction>('/biologicalFunctions', data);
  }

  // Datos simulados para el frontend
  getMockPatients(): Patient[] {
    return [
      {
        id: 1,
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@email.com',
        dateOfBirth: '1988-05-15',
        phone: '+51 999 888 777',
        address: 'Av. Principal 123, Lima',
        emergencyContact: {
          name: 'María Pérez',
          phone: '+51 999 777 666',
          relationship: 'Esposa'
        },
        profileImage: 'assets/patient1.jpg'
      },
      {
        id: 2,
        firstName: 'María',
        lastName: 'García',
        email: 'maria.garcia@email.com',
        dateOfBirth: '1995-08-20',
        phone: '+51 999 666 555',
        address: 'Jr. Secundario 456, Lima',
        emergencyContact: {
          name: 'Carlos García',
          phone: '+51 999 444 333',
          relationship: 'Hermano'
        },
        profileImage: 'assets/patient2.jpg'
      }
    ];
  }
}
