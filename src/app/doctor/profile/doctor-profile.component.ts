import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <div class="profile-image-container">
          <img [src]="doctorImage || 'assets/default-avatar.png'" alt="Doctor profile" class="profile-image">
          <button class="change-photo-btn">
            <span class="material-icons">photo_camera</span>
            Cambiar foto
          </button>
        </div>
        <div class="profile-info">
          <h1>Dr. {{ doctorName }}</h1>
          <p class="specialty">{{ specialty }}</p>
          <div class="contact-info">
            <p><span class="material-icons">email</span> {{ email }}</p>
            <p><span class="material-icons">phone</span> {{ phone }}</p>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="material-icons">people</span>
          <div class="stat-info">
            <h3>{{ totalPatients }}</h3>
            <p>Pacientes Totales</p>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons">calendar_today</span>
          <div class="stat-info">
            <h3>{{ appointmentsThisWeek }}</h3>
            <p>Citas esta semana</p>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons">trending_up</span>
          <div class="stat-info">
            <h3>{{ treatmentSuccess }}%</h3>
            <p>Éxito en tratamientos</p>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h2>Información Personal</h2>
        <div class="info-grid">
          <div class="info-item">
            <label>Nombre Completo</label>
            <p>Dr. {{ doctorName }}</p>
          </div>
          <div class="info-item">
            <label>Especialidad</label>
            <p>{{ specialty }}</p>
          </div>
          <div class="info-item">
            <label>Email</label>
            <p>{{ email }}</p>
          </div>
          <div class="info-item">
            <label>Teléfono</label>
            <p>{{ phone }}</p>
          </div>
          <div class="info-item">
            <label>Licencia Médica</label>
            <p>{{ licenseNumber }}</p>
          </div>
          <div class="info-item">
            <label>Años de Experiencia</label>
            <p>{{ yearsOfExperience }} años</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 2rem;
    }

    .profile-header {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .profile-image-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #e8eaf6;
    }

    .change-photo-btn {
      background: none;
      border: none;
      color: #3f51b5;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .profile-info {
      flex: 1;
    }

    .profile-info h1 {
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    .specialty {
      color: #3f51b5;
      font-size: 1.125rem;
      margin: 0 0 1rem 0;
    }

    .contact-info {
      display: flex;
      gap: 2rem;
    }

    .contact-info p {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background-color: #f8fafc;
      padding: 1.5rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-card .material-icons {
      font-size: 2rem;
      color: #3f51b5;
    }

    .stat-info h3 {
      color: #1f2937;
      font-size: 1.5rem;
      margin: 0;
    }

    .stat-info p {
      color: #666;
      margin: 0;
      font-size: 0.875rem;
    }

    .profile-section {
      margin-top: 2rem;
    }

    .profile-section h2 {
      color: #1f2937;
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .info-item label {
      color: #666;
      font-size: 0.875rem;
    }

    .info-item p {
      color: #1f2937;
      margin: 0;
      font-weight: 500;
    }
  `]
})
export class DoctorProfileComponent implements OnInit {
  doctorName: string = '';
  doctorImage: string = '';
  specialty: string = 'Psiquiatra';
  email: string = '';
  phone: string = '+51 999 888 777';
  licenseNumber: string = 'MED-12345';
  yearsOfExperience: number = 10;

  // Estadísticas
  totalPatients: number = 45;
  appointmentsThisWeek: number = 12;
  treatmentSuccess: number = 85;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.doctorName = `${user.firstName} ${user.lastName}`;
      this.doctorImage = user.profileImage;
      this.email = user.email;
    }
  }
}
