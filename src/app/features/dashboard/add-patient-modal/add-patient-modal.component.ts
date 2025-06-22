import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Patient } from '../domain/patient.model';

@Component({
  selector: 'app-add-patient-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="modal-container">
      <div class="modal-header">
        <h2 mat-dialog-title>
          <mat-icon>person_add</mat-icon>
          Agregar Nuevo Paciente
        </h2>
        <button mat-icon-button (click)="onCancel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-dialog-content>
        <form [formGroup]="patientForm" class="form-container">
          <div class="form-section">
            <h3>Información Personal</h3>

            <mat-form-field appearance="outline">
              <mat-label>Nombres completos</mat-label>
              <input matInput formControlName="name" placeholder="Ingrese nombres completos">
              <mat-icon matSuffix>person</mat-icon>
              <mat-error *ngIf="patientForm.get('name')?.hasError('required')">
                Los nombres son requeridos
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>DNI</mat-label>
              <input matInput formControlName="dni" placeholder="Ingrese DNI">
              <mat-icon matSuffix>badge</mat-icon>
              <mat-error *ngIf="patientForm.get('dni')?.hasError('required')">
                El DNI es requerido
              </mat-error>
              <mat-error *ngIf="patientForm.get('dni')?.hasError('pattern')">
                El DNI debe tener 8 dígitos
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Fecha de nacimiento</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="birthDate">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error *ngIf="patientForm.get('birthDate')?.hasError('required')">
                La fecha de nacimiento es requerida
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-section">
            <h3>Información de Contacto</h3>

            <mat-form-field appearance="outline">
              <mat-label>Correo electrónico</mat-label>
              <input matInput formControlName="email" type="email" placeholder="ejemplo@email.com">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="patientForm.get('email')?.hasError('required')">
                El correo es requerido
              </mat-error>
              <mat-error *ngIf="patientForm.get('email')?.hasError('email')">
                Por favor ingrese un correo válido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Teléfono</mat-label>
              <input matInput formControlName="phone" placeholder="Ingrese número de teléfono">
              <mat-icon matSuffix>phone</mat-icon>
              <mat-error *ngIf="patientForm.get('phone')?.hasError('required')">
                El teléfono es requerido
              </mat-error>
            </mat-form-field>
          </div>
        </form>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button mat-button (click)="onCancel()" class="cancel-button">
          <mat-icon>close</mat-icon>
          Cancelar
        </button>
        <button mat-raised-button color="primary"
                (click)="onSubmit()"
                [disabled]="!patientForm.valid"
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
      padding: 20px 24px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;

      h2 {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #2c3e50;
        font-size: 1.5rem;

        mat-icon {
          color: #1976d2;
        }
      }
    }

    mat-dialog-content {
      padding: 24px;
      max-height: 60vh;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: #bbb;
        border-radius: 4px;

        &:hover {
          background: #999;
        }
      }
    }

    .form-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .form-section {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);

      h3 {
        margin: 0 0 16px 0;
        color: #2c3e50;
        font-size: 1.1rem;
        font-weight: 500;
      }

      mat-form-field {
        width: 100%;
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    mat-dialog-actions {
      padding: 16px 24px;
      border-top: 1px solid #e0e0e0;
      margin: 0;
      gap: 12px;
      justify-content: flex-end;
      background-color: #f8f9fa;

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }

      .cancel-button {
        color: #666;
      }

      .save-button {
        min-width: 120px;
      }
    }

    ::ng-deep {
      .mat-mdc-form-field-icon-suffix {
        color: #666;
      }

      .mat-mdc-text-field-wrapper {
        background-color: #fff !important;
      }
    }

    @media (max-width: 600px) {
      .modal-container {
        min-width: auto;
        width: 100%;
      }

      .modal-header h2 {
        font-size: 1.3rem;
      }

      mat-dialog-content {
        padding: 16px;
      }

      .form-section {
        padding: 16px;
      }
    }
  `]
})
export class AddPatientModalComponent {
  patientForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddPatientModalComponent>,
    private formBuilder: FormBuilder
  ) {
    this.patientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const formValue = this.patientForm.value;
      const [firstName, ...lastNameParts] = formValue.name.trim().split(' ');

      // Calculate age from birthDate
      const birthDate = new Date(formValue.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      const newPatient: Patient = {
        id: Math.random().toString(36).substr(2, 9),
        name: firstName,
        lastName: lastNameParts.join(' '),
        email: formValue.email,
        phone: formValue.phone,
        dni: formValue.dni,
        birthDate: formValue.birthDate,
        age: age,
        photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formValue.dni}`,
        notes: [],
        appointments: []
      };
      this.dialogRef.close(newPatient);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
