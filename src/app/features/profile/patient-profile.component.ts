import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NavbarComponent,
    MatIconModule
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="profile-container">
      <div class="profile-grid">
        <!-- Columna Izquierda -->
        <div class="profile-left-column">
          <div class="profile-header">
            <div class="profile-avatar">
              <img src="assets/avatars/patient-1.png" alt="Profile photo">
            </div>
            <div class="profile-info">
              <h1>{{profile.name}} {{profile.lastName}}</h1>
              <p class="age">{{profile.age}} años</p>
            </div>
          </div>

          <div class="profile-content">
            <div class="section personal-data">
              <h2>Datos personales</h2>
              <form class="profile-form">
                <mat-form-field appearance="outline">
                  <mat-label>DNI</mat-label>
                  <input matInput [(ngModel)]="profile.dni" name="dni" readonly>
                  <mat-icon matSuffix>badge</mat-icon>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Teléfono</mat-label>
                  <input matInput [(ngModel)]="profile.phone" name="phone">
                  <mat-icon matSuffix>phone</mat-icon>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" [(ngModel)]="profile.email" name="email">
                  <mat-icon matSuffix>email</mat-icon>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Dirección</mat-label>
                  <input matInput [(ngModel)]="profile.address" name="address">
                  <mat-icon matSuffix>location_on</mat-icon>
                </mat-form-field>
              </form>
            </div>
          </div>
        </div>

        <!-- Columna Derecha -->
        <div class="profile-right-column">
          <div class="profile-content">
            <div class="section medical-history">
              <h2>Historial Médico</h2>
              <div class="medical-info">
                <div class="info-item">
                  <h3>Diagnóstico Actual</h3>
                  <p>{{profile.currentDiagnosis || 'No hay diagnóstico actual'}}</p>
                  <p class="date" *ngIf="profile.diagnosisDate">Desde: {{profile.diagnosisDate | date}}</p>
                </div>

                <div class="info-item">
                  <h3>Medicación Actual</h3>
                  <p>{{profile.currentMedication || 'No hay medicación actual'}}</p>
                </div>

                <div class="info-item">
                  <h3>Próxima Cita</h3>
                  <p>{{profile.nextAppointment || 'No hay citas programadas'}}</p>
                </div>
              </div>
            </div>

            <div class="actions">
              <button mat-raised-button color="primary" (click)="save()">
                <mat-icon>save</mat-icon>
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      background-color: #f5f9fc;
      min-height: calc(100vh - 64px);
    }

    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .profile-left-column,
    .profile-right-column {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .profile-header {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }

    .profile-avatar {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #e1f5fe;
      margin: 0 auto 1.5rem;
    }

    .profile-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-info h1 {
      margin: 0;
      color: #0a192f;
      font-size: 2rem;
      font-weight: 600;
    }

    .age {
      color: #2196f3;
      font-size: 1.2rem;
      margin: 0.5rem 0;
    }

    .profile-content {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .section {
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    h2 {
      color: #0a192f;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .profile-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .medical-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-item {
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;

      h3 {
        color: #0a192f;
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: #64748b;
        line-height: 1.4;

        &.date {
          color: #2196f3;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
      }
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    button {
      padding: 0.5rem 1.5rem;
    }

    @media (max-width: 1024px) {
      .profile-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .profile-container {
        padding: 1rem;
      }
    }
  `]
})
export class PatientProfileComponent {
  profile = {
    name: 'Juan',
    lastName: 'Del Piero',
    age: 32,
    dni: '11223344',
    email: 'juan.delpiero@example.com',
    phone: '984 123 451',
    address: 'Av. Principal 123, Lima',
    currentDiagnosis: 'Trastorno de ansiedad generalizada',
    diagnosisDate: '2024-01-15',
    currentMedication: 'Sertralina 50mg - 1 tableta diaria',
    nextAppointment: '28 de Marzo, 2024 - 10:30 AM'
  };

  save() {
    console.log('Guardando perfil:', this.profile);
  }
}
