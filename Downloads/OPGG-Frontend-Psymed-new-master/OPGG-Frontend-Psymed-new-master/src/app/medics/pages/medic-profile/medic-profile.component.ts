import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicService } from '../../services/medic.service';
import { Medic } from '../../model/medic.entity';

@Component({
  selector: 'app-medic-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h1>Mi Perfil Profesional</h1>
        <p>Gestiona tu información profesional y experiencia médica</p>
      </div>

      <div class="profile-content">
        <!-- Foto de perfil -->
        <div class="profile-photo-section">
          <div class="photo-container">
            <img *ngIf="medic.profilePhoto" [src]="medic.profilePhoto" [alt]="medic.firstName + ' ' + medic.lastName" class="profile-photo">
            <div *ngIf="!medic.profilePhoto" class="profile-photo-placeholder">
              <i class="photo-icon">👨‍⚕️</i>
              <span>{{ getInitials() }}</span>
            </div>
          </div>
          <div class="photo-actions">
            <button class="btn-secondary" (click)="changePhoto()">Cambiar Foto</button>
            <button class="btn-danger" *ngIf="medic.profilePhoto" (click)="removePhoto()">Eliminar</button>
          </div>

          <!-- Estadísticas rápidas -->
          <div class="quick-stats">
            <div class="stat-item">
              <span class="stat-number">{{ medic.yearsOfExperience || 0 }}</span>
              <span class="stat-label">Años de Experiencia</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ medic.totalPatients || 0 }}</span>
              <span class="stat-label">Pacientes Atendidos</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ medic.rating || 0 }}/5</span>
              <span class="stat-label">Calificación</span>
            </div>
          </div>
        </div>

        <!-- Información profesional -->
        <div class="profile-info-section">
          <div class="info-card">
            <h3>Información Personal</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Nombre:</label>
                <input type="text" [(ngModel)]="medic.firstName" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Apellido:</label>
                <input type="text" [(ngModel)]="medic.lastName" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Email:</label>
                <input type="email" [(ngModel)]="medic.email" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Teléfono:</label>
                <input type="tel" [(ngModel)]="medic.phone" [disabled]="!editMode" class="form-input">
              </div>
            </div>
          </div>

          <!-- Información profesional -->
          <div class="info-card">
            <h3>Información Profesional</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Especialidad Principal:</label>
                <select [(ngModel)]="medic.specialty" [disabled]="!editMode" class="form-input">
                  <option value="Cardiología">Cardiología</option>
                  <option value="Pediatría">Pediatría</option>
                  <option value="Neurología">Neurología</option>
                  <option value="Dermatología">Dermatología</option>
                  <option value="Ginecología">Ginecología</option>
                  <option value="Medicina General">Medicina General</option>
                  <option value="Psiquiatría">Psiquiatría</option>
                  <option value="Ortopedia">Ortopedia</option>
                  <option value="Oftalmología">Oftalmología</option>
                  <option value="Otorrinolaringología">Otorrinolaringología</option>
                </select>
              </div>
              <div class="info-item">
                <label>Número de Licencia:</label>
                <input type="text" [(ngModel)]="medic.licenseNumber" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Años de Experiencia:</label>
                <input type="number" [(ngModel)]="medic.yearsOfExperience" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Tarifa de Consulta:</label>
                <input type="number" [(ngModel)]="medic.consultationFee" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Horario de Trabajo:</label>
                <input type="text" [(ngModel)]="medic.workingHours" [disabled]="!editMode" class="form-input" placeholder="Ej: 8:00 AM - 5:00 PM">
              </div>
              <div class="info-item">
                <label>Hospital/Clínica:</label>
                <input type="text" [(ngModel)]="medic.hospital" [disabled]="!editMode" class="form-input">
              </div>
            </div>
          </div>

          <!-- Educación y certificaciones -->
          <div class="info-card">
            <h3>Educación y Certificaciones</h3>
            <div class="education-section">
              <div class="education-list">
                <div *ngFor="let education of medic.education; let i = index" class="education-item">
                  <div class="education-content">
                    <div class="info-item">
                      <label>Título:</label>
                      <input type="text" [(ngModel)]="education.degree" [disabled]="!editMode" class="form-input">
                    </div>
                    <div class="info-item">
                      <label>Institución:</label>
                      <input type="text" [(ngModel)]="education.institution" [disabled]="!editMode" class="form-input">
                    </div>
                    <div class="info-item">
                      <label>Año:</label>
                      <input type="number" [(ngModel)]="education.year" [disabled]="!editMode" class="form-input">
                    </div>
                  </div>
                  <button *ngIf="editMode" (click)="removeEducation(i)" class="btn-danger btn-small">Eliminar</button>
                </div>
              </div>
              <button *ngIf="editMode" (click)="addEducation()" class="btn-secondary">+ Agregar Educación</button>
            </div>
          </div>

          <!-- Especialidades adicionales -->
          <div class="info-card">
            <h3>Especialidades y Competencias</h3>
            <div class="tags-section">
              <div class="tag-group">
                <label>Especialidades Adicionales:</label>
                <div class="tags-container">
                  <span *ngFor="let specialty of medic.additionalSpecialties" class="tag specialty-tag">
                    {{ specialty }}
                    <button *ngIf="editMode" (click)="removeSpecialty(specialty)" class="remove-tag">×</button>
                  </span>
                  <input *ngIf="editMode" type="text" placeholder="Agregar especialidad" (keyup.enter)="addSpecialty($event)" class="tag-input">
                </div>
              </div>

              <div class="tag-group">
                <label>Idiomas:</label>
                <div class="tags-container">
                  <span *ngFor="let language of medic.languages" class="tag language-tag">
                    {{ language }}
                    <button *ngIf="editMode" (click)="removeLanguage(language)" class="remove-tag">×</button>
                  </span>
                  <input *ngIf="editMode" type="text" placeholder="Agregar idioma" (keyup.enter)="addLanguage($event)" class="tag-input">
                </div>
              </div>
            </div>
          </div>

          <!-- Descripción profesional -->
          <div class="info-card">
            <h3>Descripción Profesional</h3>
            <div class="description-section">
              <textarea
                [(ngModel)]="medic.description"
                [disabled]="!editMode"
                class="form-textarea"
                placeholder="Describe tu experiencia, enfoques de tratamiento, filosofía médica, etc."
                rows="6">
              </textarea>
            </div>
          </div>

          <!-- Disponibilidad -->
          <div class="info-card">
            <h3>Disponibilidad</h3>
            <div class="availability-section">
              <div class="availability-grid">
                <div *ngFor="let day of weekDays" class="availability-item">
                  <label>
                    <input type="checkbox" [(ngModel)]="medic.availability[day.key]" [disabled]="!editMode">
                    {{ day.label }}
                  </label>
                  <div *ngIf="medic.availability[day.key]" class="time-inputs">
                    <input type="time" [ngModel]="getScheduleStart(day.key)" (ngModelChange)="setScheduleStart(day.key, $event)" [disabled]="!editMode" class="form-input time-input">
                    <span>-</span>
                    <input type="time" [ngModel]="getScheduleEnd(day.key)" (ngModelChange)="setScheduleEnd(day.key, $event)" [disabled]="!editMode" class="form-input time-input">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="profile-actions">
        <button *ngIf="!editMode" class="btn-primary" (click)="enableEdit()">
          ✏️ Editar Perfil
        </button>
        <div *ngIf="editMode" class="edit-actions">
          <button class="btn-success" (click)="saveProfile()">
            💾 Guardar Cambios
          </button>
          <button class="btn-secondary" (click)="cancelEdit()">
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .profile-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .profile-header h1 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .profile-header p {
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    .profile-content {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 2rem;
    }

    .profile-photo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .photo-container {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 1rem;
      border: 4px solid #e9ecef;
    }

    .profile-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-photo-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #27ae60, #2ecc71);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .photo-icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    .photo-actions {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .quick-stats {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }

    .stat-item {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
      color: #27ae60;
    }

    .stat-label {
      font-size: 0.8rem;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .profile-info-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .info-card h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #27ae60;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
    }

    .info-item label {
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .form-input, .form-textarea {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-input:focus, .form-textarea:focus {
      outline: none;
      border-color: #27ae60;
    }

    .form-input:disabled, .form-textarea:disabled {
      background-color: #f8f9fa;
      color: #6c757d;
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    .education-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .education-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .education-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 6px;
      border-left: 4px solid #27ae60;
    }

    .education-content {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .tags-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .tag-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .tag-group label {
      font-weight: bold;
      color: #2c3e50;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }

    .tag {
      background: #e9ecef;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .specialty-tag {
      background: #e3f2fd;
      color: #1976d2;
      border: 1px solid #bbdefb;
    }

    .language-tag {
      background: #f3e5f5;
      color: #7b1fa2;
      border: 1px solid #e1bee7;
    }

    .remove-tag {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tag-input {
      border: 1px dashed #ddd;
      background: transparent;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.9rem;
      min-width: 150px;
    }

    .availability-section {
      margin-top: 0.5rem;
    }

    .availability-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .availability-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .availability-item label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: bold;
      color: #2c3e50;
    }

    .time-inputs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .time-input {
      flex: 1;
      min-width: 0;
    }

    .profile-actions {
      margin-top: 2rem;
      text-align: center;
    }

    .edit-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn-primary, .btn-secondary, .btn-danger, .btn-success {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .btn-small {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .btn-primary {
      background: #3498db;
      color: white;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    .btn-secondary {
      background: #95a5a6;
      color: white;
    }

    .btn-secondary:hover {
      background: #7f8c8d;
    }

    .btn-danger {
      background: #e74c3c;
      color: white;
    }

    .btn-danger:hover {
      background: #c0392b;
    }

    .btn-success {
      background: #27ae60;
      color: white;
    }

    .btn-success:hover {
      background: #219a52;
    }

    @media (max-width: 768px) {
      .profile-content {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .profile-photo-section {
        order: -1;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .education-content {
        grid-template-columns: 1fr;
      }

      .availability-grid {
        grid-template-columns: 1fr;
      }

      .edit-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class MedicProfileComponent implements OnInit {
  medic: Medic = new Medic({});
  editMode = false;
  originalMedic: Medic = new Medic({});

  weekDays = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ];

  constructor(private medicService: MedicService) {}

  ngOnInit(): void {
    this.loadMedicProfile();
  }

  private loadMedicProfile(): void {
    // En un caso real, obtendríamos el ID del usuario logueado
    const medicId = 1;

    // Datos de ejemplo
    this.medic = new Medic({
      id: medicId,
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@hospital.com',
      phone: '555-0001',
      specialty: 'Cardiología',
      licenseNumber: 'MED-001',
      yearsOfExperience: 8,
      consultationFee: 150,
      workingHours: '8:00 AM - 5:00 PM',
      hospital: 'Hospital General',
      description: 'Cardiólogo con más de 8 años de experiencia en el diagnóstico y tratamiento de enfermedades cardiovasculares. Especializado en ecocardiografía y medicina preventiva. Comprometido con brindar atención personalizada y de calidad a cada paciente.',
      profilePhoto: '',
      totalPatients: 1250,
      rating: 4.8,
      education: [
        { degree: 'Medicina General', institution: 'Universidad Nacional', year: 2010 },
        { degree: 'Especialidad en Cardiología', institution: 'Hospital Universitario', year: 2014 }
      ],
      additionalSpecialties: ['Ecocardiografía', 'Medicina Preventiva', 'Rehabilitación Cardíaca'],
      languages: ['Español', 'Inglés', 'Portugués'],
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false
      },
      schedules: {
        monday: { start: '08:00', end: '17:00' },
        tuesday: { start: '08:00', end: '17:00' },
        wednesday: { start: '08:00', end: '17:00' },
        thursday: { start: '08:00', end: '17:00' },
        friday: { start: '08:00', end: '17:00' },
        saturday: { start: '', end: '' },
        sunday: { start: '', end: '' }
      }
    });

    this.originalMedic = new Medic(this.medic);
  }

  getInitials(): string {
    return `${this.medic.firstName?.charAt(0) || ''}${this.medic.lastName?.charAt(0) || ''}`.toUpperCase();
  }

  enableEdit(): void {
    this.editMode = true;
    this.originalMedic = new Medic(this.medic);
  }

  cancelEdit(): void {
    this.editMode = false;
    this.medic = new Medic(this.originalMedic);
  }

  saveProfile(): void {
    // Aquí se guardaría en el backend
    console.log('Guardando perfil:', this.medic);
    this.editMode = false;
    // Simular guardado exitoso
    alert('Perfil actualizado correctamente');
  }

  changePhoto(): void {
    // Simular cambio de foto
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.medic.profilePhoto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  removePhoto(): void {
    this.medic.profilePhoto = '';
  }

  addEducation(): void {
    this.medic.education.push({ degree: '', institution: '', year: new Date().getFullYear() });
  }

  removeEducation(index: number): void {
    this.medic.education.splice(index, 1);
  }

  addSpecialty(event: any): void {
    const value = event.target.value.trim();
    if (value && !this.medic.additionalSpecialties.includes(value)) {
      this.medic.additionalSpecialties.push(value);
      event.target.value = '';
    }
  }

  removeSpecialty(specialty: string): void {
    this.medic.additionalSpecialties = this.medic.additionalSpecialties.filter(s => s !== specialty);
  }

  addLanguage(event: any): void {
    const value = event.target.value.trim();
    if (value && !this.medic.languages.includes(value)) {
      this.medic.languages.push(value);
      event.target.value = '';
    }
  }

  removeLanguage(language: string): void {
    this.medic.languages = this.medic.languages.filter(l => l !== language);
  }

  getScheduleStart(day: string): string {
    return this.medic.schedules[day]?.start || '';
  }

  setScheduleStart(day: string, time: string): void {
    if (!this.medic.schedules[day]) {
      this.medic.schedules[day] = { start: '', end: '' };
    }
    this.medic.schedules[day].start = time;
  }

  getScheduleEnd(day: string): string {
    return this.medic.schedules[day]?.end || '';
  }

  setScheduleEnd(day: string, time: string): void {
    if (!this.medic.schedules[day]) {
      this.medic.schedules[day] = { start: '', end: '' };
    }
    this.medic.schedules[day].end = time;
  }
}
