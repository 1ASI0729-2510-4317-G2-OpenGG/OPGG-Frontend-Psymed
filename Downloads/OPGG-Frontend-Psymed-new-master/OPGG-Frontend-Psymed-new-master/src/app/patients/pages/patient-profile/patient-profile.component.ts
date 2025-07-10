import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient.entity';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h1>Mi Perfil</h1>
        <p>Gestiona tu información personal y preferencias</p>
      </div>

      <div class="profile-content">
        <!-- Foto de perfil -->
        <div class="profile-photo-section">
          <div class="photo-container">
            <img *ngIf="patient?.profilePhoto" [src]="patient.profilePhoto" [alt]="patient.firstName + ' ' + patient.lastName" class="profile-photo">
            <div *ngIf="!patient?.profilePhoto" class="profile-photo-placeholder">
              <i class="photo-icon">📷</i>
              <span>{{ getInitials() }}</span>
            </div>
          </div>
          <div class="photo-actions">
            <button class="btn-secondary" (click)="changePhoto()">Cambiar Foto</button>
            <button class="btn-danger" *ngIf="patient?.profilePhoto" (click)="removePhoto()">Eliminar</button>
          </div>
        </div>

        <!-- Información personal -->
        <div class="profile-info-section">
          <div class="info-card">
            <h3>Información Personal</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Nombre:</label>
                <input type="text" [(ngModel)]="patient.firstName" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Apellido:</label>
                <input type="text" [(ngModel)]="patient.lastName" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Email:</label>
                <input type="email" [(ngModel)]="patient.email" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Teléfono:</label>
                <input type="tel" [(ngModel)]="patient.phone" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Fecha de Nacimiento:</label>
                <input type="date" [(ngModel)]="patient.dateOfBirth" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Género:</label>
                <select [(ngModel)]="patient.gender" [disabled]="!editMode" class="form-input">
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Información médica -->
          <div class="info-card">
            <h3>Información Médica</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Tipo de Sangre:</label>
                <select [(ngModel)]="patient.bloodType" [disabled]="!editMode" class="form-input">
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div class="info-item">
                <label>Altura (cm):</label>
                <input type="number" [(ngModel)]="patient.height" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Peso (kg):</label>
                <input type="number" [(ngModel)]="patient.weight" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Seguro Médico:</label>
                <input type="text" [(ngModel)]="patient.insuranceProvider" [disabled]="!editMode" class="form-input">
              </div>
            </div>
          </div>

          <!-- Contacto de emergencia -->
          <div class="info-card">
            <h3>Contacto de Emergencia</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Nombre:</label>
                <input type="text" [(ngModel)]="patient.emergencyContactName" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Teléfono:</label>
                <input type="tel" [(ngModel)]="patient.emergencyContactPhone" [disabled]="!editMode" class="form-input">
              </div>
              <div class="info-item">
                <label>Relación:</label>
                <input type="text" [(ngModel)]="patient.emergencyContactRelation" [disabled]="!editMode" class="form-input">
              </div>
            </div>
          </div>

          <!-- Descripción personal -->
          <div class="info-card">
            <h3>Acerca de mí</h3>
            <div class="description-section">
              <textarea
                [(ngModel)]="patient.description"
                [disabled]="!editMode"
                class="form-textarea"
                placeholder="Cuéntanos un poco sobre ti, tus intereses, condiciones médicas importantes, etc."
                rows="4">
              </textarea>
            </div>
          </div>

          <!-- Alergias y condiciones -->
          <div class="info-card">
            <h3>Alergias y Condiciones Médicas</h3>
            <div class="tags-section">
              <div class="tag-group">
                <label>Alergias:</label>
                <div class="tags-container">
                  <span *ngFor="let allergy of patient.allergies" class="tag allergy-tag">
                    {{ allergy }}
                    <button *ngIf="editMode" (click)="removeAllergy(allergy)" class="remove-tag">×</button>
                  </span>
                  <input *ngIf="editMode" type="text" placeholder="Agregar alergia" (keyup.enter)="addAllergy($event)" class="tag-input">
                </div>
              </div>

              <div class="tag-group">
                <label>Condiciones Médicas:</label>
                <div class="tags-container">
                  <span *ngFor="let condition of patient.medicalConditions" class="tag condition-tag">
                    {{ condition }}
                    <button *ngIf="editMode" (click)="removeCondition(condition)" class="remove-tag">×</button>
                  </span>
                  <input *ngIf="editMode" type="text" placeholder="Agregar condición" (keyup.enter)="addCondition($event)" class="tag-input">
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
      grid-template-columns: 300px 1fr;
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
      background: linear-gradient(135deg, #3498db, #2980b9);
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
      border-bottom: 2px solid #3498db;
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
      border-color: #3498db;
    }

    .form-input:disabled, .form-textarea:disabled {
      background-color: #f8f9fa;
      color: #6c757d;
    }

    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }

    .description-section {
      margin-top: 0.5rem;
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

    .allergy-tag {
      background: #fee;
      color: #c0392b;
      border: 1px solid #f8d7da;
    }

    .condition-tag {
      background: #fff3cd;
      color: #856404;
      border: 1px solid #ffeaa7;
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

      .edit-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class PatientProfileComponent implements OnInit {
  patient: Patient = new Patient({});
  editMode = false;
  originalPatient: Patient = new Patient({});

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatientProfile();
  }

  private loadPatientProfile(): void {
    // En un caso real, obtendríamos el ID del usuario logueado
    const patientId = 1;

    // Datos de ejemplo
    this.patient = new Patient({
      id: patientId,
      firstName: 'Ana',
      lastName: 'López',
      email: 'ana.lopez@email.com',
      phone: '555-0123',
      dateOfBirth: '1990-05-15',
      gender: 'female',
      bloodType: 'A+',
      height: 165,
      weight: 60,
      insuranceProvider: 'Seguros Médicos S.A.',
      emergencyContactName: 'Carlos López',
      emergencyContactPhone: '555-0456',
      emergencyContactRelation: 'Hermano',
      description: 'Me gusta mantenerme activa con ejercicio regular. Practico yoga y natación. Tengo una dieta balanceada y me preocupo por mi salud preventiva.',
      allergies: ['Penicilina', 'Mariscos'],
      medicalConditions: ['Hipertensión leve'],
      profilePhoto: ''
    });

    this.originalPatient = new Patient(this.patient);
  }

  getInitials(): string {
    return `${this.patient.firstName?.charAt(0) || ''}${this.patient.lastName?.charAt(0) || ''}`.toUpperCase();
  }

  enableEdit(): void {
    this.editMode = true;
    this.originalPatient = new Patient(this.patient);
  }

  cancelEdit(): void {
    this.editMode = false;
    this.patient = new Patient(this.originalPatient);
  }

  saveProfile(): void {
    // Aquí se guardaría en el backend
    console.log('Guardando perfil:', this.patient);
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
          this.patient.profilePhoto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  removePhoto(): void {
    this.patient.profilePhoto = '';
  }

  addAllergy(event: any): void {
    const value = event.target.value.trim();
    if (value && !this.patient.allergies.includes(value)) {
      this.patient.allergies.push(value);
      event.target.value = '';
    }
  }

  removeAllergy(allergy: string): void {
    this.patient.allergies = this.patient.allergies.filter(a => a !== allergy);
  }

  addCondition(event: any): void {
    const value = event.target.value.trim();
    if (value && !this.patient.medicalConditions.includes(value)) {
      this.patient.medicalConditions.push(value);
      event.target.value = '';
    }
  }

  removeCondition(condition: string): void {
    this.patient.medicalConditions = this.patient.medicalConditions.filter(c => c !== condition);
  }
}
