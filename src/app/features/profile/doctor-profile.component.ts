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
  selector: 'app-doctor-profile',
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
              <img src="../../assets/avatars/doctor-1.png" alt="Profile photo">
            </div>
            <div class="profile-info">
              <h1>{{profile.name}} {{profile.lastName}}</h1>
              <p class="specialty">{{profile.specialty}}</p>
            </div>
          </div>

          <div class="profile-content">
            <div class="section personal-data">
              <h2>Datos personales</h2>
              <form class="profile-form">
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
            <div class="section about">
              <h2>Sobre mí</h2>
              <p class="description">{{profile.description}}</p>
            </div>

            <div class="section education">
              <h2>Educación</h2>
              <div class="education-item" *ngFor="let edu of profile.education">
                <h3>{{edu.degree}}</h3>
                <p>{{edu.institution}}</p>
                <p class="year">{{edu.year}}</p>
              </div>
            </div>

            <div class="section specialties">
              <h2>Especialidades</h2>
              <div class="specialty-tags">
                <span class="specialty-tag" *ngFor="let spec of profile.specialties">
                  {{spec}}
                </span>
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

    .specialty {
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

    .description {
      color: #64748b;
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
    }

    .education-item {
      margin-bottom: 1.5rem;

      h3 {
        color: #0a192f;
        margin: 0;
        font-size: 1.1rem;
      }

      p {
        margin: 0.3rem 0;
        color: #64748b;
      }

      .year {
        color: #2196f3;
        font-size: 0.9rem;
      }
    }

    .specialty-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }

    .specialty-tag {
      background: #e3f2fd;
      color: #1976d2;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
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
export class DoctorProfileComponent {
  profile = {
    name: 'Dr. Gilberto',
    lastName: 'Del Campo Godomar',
    specialty: 'Psiquiatría',
    email: 'gilberto.delcampo@example.com',
    phone: '123-456-789',
    address: 'Av. Principal 123, Lima',
    description: 'El Dr. Del Campo es psiquiatra, graduado en Medicina y especializado en salud mental. Posee experiencia en trastornos del estado de ánimo, ansiedad y psicoterapia, combinando tratamientos basados en evidencia con un enfoque centrado en el paciente.',
    education: [
      {
        degree: 'Doctorado en Medicina',
        institution: 'Universidad Nacional Mayor de San Marcos',
        year: '2015'
      },
      {
        degree: 'Especialización en Psiquiatría',
        institution: 'Hospital Nacional Guillermo Almenara',
        year: '2018'
      }
    ],
    specialties: [
      'Psiquiatría General',
      'Trastornos del Estado de Ánimo',
      'Ansiedad',
      'Psicoterapia',
      'Salud Mental'
    ]
  };

  save() {
    console.log('Guardando perfil:', this.profile);
  }
}
