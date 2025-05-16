import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Session } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private endpoint = '/sessions';

  constructor(private api: ApiService) {}

  getSessions(): Observable<Session[]> {
    return this.api.get<Session[]>(this.endpoint);
  }

  getSessionById(id: number): Observable<Session> {
    return this.api.get<Session>(`${this.endpoint}/${id}`);
  }

  createSession(data: Partial<Session>): Observable<Session> {
    return this.api.post<Session>(this.endpoint, data);
  }

  updateSession(id: number, data: Partial<Session>): Observable<Session> {
    return this.api.put<Session>(`${this.endpoint}/${id}`, data);
  }

  // Datos simulados para el frontend
  getMockSessions(): Session[] {
    return [
      {
        id: 1,
        patientId: 1,
        professionalId: 1,
        date: '2024-03-24',
        time: '15:00',
        status: 'scheduled',
        notes: 'Consulta de seguimiento'
      },
      {
        id: 2,
        patientId: 2,
        professionalId: 1,
        date: '2024-03-24',
        time: '16:00',
        status: 'scheduled',
        notes: 'Primera consulta'
      },
      {
        id: 3,
        patientId: 1,
        professionalId: 1,
        date: '2024-03-15',
        time: '15:00',
        status: 'completed',
        notes: 'Paciente reporta mejora en síntomas'
      }
    ];
  }

  getTodayAppointments(): Session[] {
    const today = new Date().toISOString().split('T')[0];
    return this.getMockSessions().filter(session =>
      session.date === today && session.status === 'scheduled'
    );
  }
}
