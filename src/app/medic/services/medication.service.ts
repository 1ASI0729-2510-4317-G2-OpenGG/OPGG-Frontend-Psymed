import { Injectable } from '@angular/core';
import { Medication } from '../model/medications.entity';
import { MedicationApiService } from '../infraestructure/medication-api-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MedicationService {
  constructor(private api: MedicationApiService) {}

  getAllMedications(): Observable<Medication[]> {
    return this.api.getAll();
  }

  getMedicationById(id: string): Observable<Medication> {
    return this.api.getById(id);
  }

  createMedication(medication: Medication): Observable<Medication> {
    return this.api.create(medication);
  }

}
