import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Medication } from '../../domain/patient.model';

@Component({
  selector: 'app-add-medication-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="modal-container">
      <div class="modal-header">
        <h2 mat-dialog-title>
          <mat-icon>medication</mat-icon>
          Agregar Medicamento
        </h2>
        <button mat-icon-button (click)="onCancel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-dialog-content>
        <form [formGroup]="medicationForm" class="form-container">
          <mat-form-field appearance="outline">
            <mat-label>Nombre del medicamento</mat-label>
            <input matInput formControlName="name" placeholder="Ingrese el nombre del medicamento">
            <mat-error *ngIf="medicationForm.get('name')?.hasError('required')">
              El nombre del medicamento es requerido
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Dosis</mat-label>
            <input matInput formControlName="dosage" placeholder="Ej: 500mg">
            <mat-error *ngIf="medicationForm.get('dosage')?.hasError('required')">
              La dosis es requerida
            </mat-error>
          </mat-form-field>

          <div class="frequency-container">
            <mat-form-field appearance="outline">
              <mat-label>Frecuencia</mat-label>
              <input matInput type="number" formControlName="frequency" min="1">
              <mat-error *ngIf="medicationForm.get('frequency')?.hasError('required')">
                La frecuencia es requerida
              </mat-error>
              <mat-error *ngIf="medicationForm.get('frequency')?.hasError('min')">
                La frecuencia debe ser mayor a 0
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Unidad de tiempo</mat-label>
              <mat-select formControlName="frequencyUnit">
                <mat-option value="horas">Horas</mat-option>
                <mat-option value="dias">Días</mat-option>
                <mat-option value="semanas">Semanas</mat-option>
              </mat-select>
              <mat-error *ngIf="medicationForm.get('frequencyUnit')?.hasError('required')">
                La unidad de tiempo es requerida
              </mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline">
            <mat-label>Duración del tratamiento</mat-label>
            <input matInput formControlName="duration" placeholder="Ej: 2 semanas, 1 mes, etc.">
            <mat-error *ngIf="medicationForm.get('duration')?.hasError('required')">
              La duración del tratamiento es requerida
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Instrucciones adicionales</mat-label>
            <textarea matInput formControlName="instructions" rows="3"
                      placeholder="Instrucciones especiales para tomar el medicamento"></textarea>
          </mat-form-field>
        </form>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button mat-button (click)="onCancel()" class="cancel-button">
          <mat-icon>close</mat-icon>
          Cancelar
        </button>
        <button mat-raised-button color="primary"
                (click)="onSubmit()"
                [disabled]="!medicationForm.valid"
                class="save-button">
          <mat-icon>save</mat-icon>
          Guardar
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .modal-container {
      min-width: 500px;
      padding: 0;
      overflow: hidden;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;

      h2 {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #2c3e50;
        font-size: 1.25rem;

        mat-icon {
          color: #1976d2;
        }
      }
    }

    mat-dialog-content {
      padding: 24px;
      max-height: 60vh;
      overflow-y: auto;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .frequency-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    mat-dialog-actions {
      padding: 16px 24px;
      border-top: 1px solid #e0e0e0;
      margin: 0;
      gap: 8px;
      justify-content: flex-end;

      button {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .save-button {
        min-width: 120px;
      }
    }
  `]
})
export class AddMedicationModalComponent {
  medicationForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddMedicationModalComponent>,
    private fb: FormBuilder
  ) {
    this.medicationForm = this.fb.group({
      name: ['', Validators.required],
      dosage: ['', Validators.required],
      frequency: ['', [Validators.required, Validators.min(1)]],
      frequencyUnit: ['', Validators.required],
      duration: ['', Validators.required],
      instructions: ['']
    });
  }

  onSubmit() {
    if (this.medicationForm.valid) {
      const formValue = this.medicationForm.value;
      const medication: Medication = {
        id: Math.random().toString(36).substr(2, 9),
        name: formValue.name,
        dosage: formValue.dosage,
        frequency: formValue.frequency,
        frequencyUnit: formValue.frequencyUnit,
        duration: formValue.duration,
        instructions: formValue.instructions,
        startDate: new Date().toISOString()
      };
      this.dialogRef.close(medication);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
