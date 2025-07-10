import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionService } from '../../../shared/services/prescription.service';
import { Prescription } from '../../../shared/model/prescription.entity';

@Component({
  selector: 'app-medic-prescriptions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prescriptions-container">
      <div class="header">
        <h1>Gestión de Prescripciones</h1>
        <p>Crea y gestiona las prescripciones médicas de tus pacientes</p>
      </div>

      <div class="prescriptions-list" *ngIf="prescriptions.length > 0">
        <div *ngFor="let prescription of prescriptions" class="prescription-card">
          <div class="prescription-header">
            <div class="patient-info">
              <h3>{{ prescription.patientName }}</h3>
              <p>{{ prescription.getFormattedDate() }}</p>
            </div>
            <div class="prescription-status">
              <span class="medication-count">{{ prescription.getTotalMedications() }} medicamentos</span>
            </div>
          </div>

          <div class="prescription-content">
            <div class="diagnosis">
              <strong>Diagnóstico:</strong> {{ prescription.diagnosis }}
            </div>

            <div class="medications">
              <h4>Medicamentos:</h4>
              <div class="medication-list">
                <div *ngFor="let medication of prescription.medications" class="medication-item">
                  <div class="medication-name">{{ medication.name }}</div>
                  <div class="medication-details">{{ medication.getFormattedDosage() }}</div>
                  <div class="medication-instructions">{{ medication.instructions }}</div>
                </div>
              </div>
            </div>

            <div class="instructions" *ngIf="prescription.instructions">
              <strong>Instrucciones generales:</strong>
              <p>{{ prescription.instructions }}</p>
            </div>
          </div>

          <div class="prescription-actions">
            <button class="btn-action btn-primary" (click)="editPrescription(prescription)">
              ✏️ Editar
            </button>
            <button class="btn-action btn-secondary" (click)="duplicatePrescription(prescription)">
              📋 Duplicar
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="prescriptions.length === 0" class="empty-state">
        <div class="empty-icon">💊</div>
        <h2>No tienes prescripciones</h2>
        <p>Las prescripciones que crees aparecerán aquí</p>
      </div>
    </div>
  `,
  styles: [`
    .prescriptions-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .header p {
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    .prescriptions-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .prescription-card {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .prescription-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e9ecef;
    }

    .patient-info h3 {
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }

    .patient-info p {
      color: #7f8c8d;
      margin: 0;
    }

    .medication-count {
      background: #27ae60;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.9rem;
    }

    .diagnosis {
      margin-bottom: 1.5rem;
      color: #2c3e50;
    }

    .medications h4 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .medication-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .medication-item {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 6px;
      border-left: 4px solid #27ae60;
    }

    .medication-name {
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }

    .medication-details {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .medication-instructions {
      color: #7f8c8d;
      font-size: 0.9rem;
      font-style: italic;
    }

    .instructions {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #e9ecef;
    }

    .instructions p {
      margin: 0.5rem 0 0 0;
      color: #7f8c8d;
    }

    .prescription-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #e9ecef;
    }

    .btn-action {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #27ae60;
      color: white;
    }

    .btn-primary:hover {
      background: #219a52;
    }

    .btn-secondary {
      background: #3498db;
      color: white;
    }

    .btn-secondary:hover {
      background: #2980b9;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #7f8c8d;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
      .prescriptions-container {
        padding: 1rem;
      }

      .prescription-actions {
        flex-direction: column;
      }
    }
  `]
})
export class MedicPrescriptionsComponent implements OnInit {
  prescriptions: Prescription[] = [];

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  private loadPrescriptions(): void {
    const medicId = 1; // En un caso real vendría del usuario logueado
    this.prescriptionService.getPrescriptionsByMedic(medicId).subscribe(
      prescriptions => {
        this.prescriptions = prescriptions;
        console.log('Prescripciones cargadas:', this.prescriptions);
      }
    );
  }

  editPrescription(prescription: Prescription): void {
    console.log('Editar prescripción:', prescription);
  }

  duplicatePrescription(prescription: Prescription): void {
    console.log('Duplicar prescripción:', prescription);
  }
}
