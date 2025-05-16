import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Professional } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private endpoint = '/professionals';

  constructor(private api: ApiService) {}

  getProfessionals(): Observable<Professional[]> {
    return this.api.get<Professional[]>(this.endpoint);
  }

  getProfessionalById(id: number): Observable<Professional> {
    return this.api.get<Professional>(`${this.endpoint}/${id}`);
  }

  updateProfessional(id: number, data: Partial<Professional>): Observable<Professional> {
    return this.api.put<Professional>(`${this.endpoint}/${id}`, data);
  }

  // Métodos simulados para el frontend
  getCurrentProfessional(): Professional {
    return {
      id: 1,
      firstName: 'Jhomar',
      lastName: 'Ast',
      email: 'jhomar.ast@spymed.com',
      specialityId: 1,
      licenseNumber: 'PSY-12345',
      phone: '+51 999 888 777',
      profileImage: 'assets/doctor-profile.jpg'
    };
  }

  getStatistics() {
    return {
      totalPatients: 32,
      appointmentsToday: 8,
      pendingActions: 3
    };
  }
}
