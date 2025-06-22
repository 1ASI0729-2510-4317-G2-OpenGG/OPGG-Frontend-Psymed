import { Component, OnInit } from '@angular/core';
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
      <h2 mat-dialog-title>Agregar Nuevo Paciente</h2>

      <mat-dialog-content class="modal-content">
        <form [formGroup]="patientForm" class="form-container">
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="name" placeholder="Ingrese nombre">
              <mat-error *ngIf="patientForm.get('name')?.hasError('required')">
                El nombre es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Apellido</mat-label>
              <input matInput formControlName="lastName" placeholder="Ingrese apellido">
              <mat-error *ngIf="patientForm.get('lastName')?.hasError('required')">
                El apellido es requerido
              </mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" placeholder="ejemplo@email.com">
            <mat-error *ngIf="patientForm.get('email')?.hasError('required')">
              El email es requerido
            </mat-error>
            <mat-error *ngIf="patientForm.get('email')?.hasError('email')">
              Por favor ingrese un email válido
            </mat-error>
          </mat-form-field>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Teléfono</mat-label>
              <input matInput formControlName="phone" placeholder="Ingrese teléfono">
              <mat-error *ngIf="patientForm.get('phone')?.hasError('required')">
                El teléfono es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>DNI</mat-label>
              <input matInput formControlName="dni" placeholder="Ingrese DNI">
              <mat-error *ngIf="patientForm.get('dni')?.hasError('required')">
                El DNI es requerido
              </mat-error>
              <mat-error *ngIf="patientForm.get('dni')?.hasError('pattern')">
                El DNI debe tener 8 dígitos
              </mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline">
            <mat-label>Fecha de Nacimiento</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="birthDate">
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="patientForm.get('birthDate')?.hasError('required')">
              La fecha de nacimiento es requerida
            </mat-error>
          </mat-form-field>
        </form>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button mat-raised-button color="primary"
                (click)="onSubmit()"
                [disabled]="!patientForm.valid">
          Guardar
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .modal-container {
      padding: 0;
      max-height: 85vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    h2 {
      margin: 0;
      padding: 1.5rem;
      color: #0a192f;
      font-size: 1.5rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .modal-content {
      padding: 1rem 1.5rem;
      overflow-y: auto;
      max-height: calc(85vh - 130px);
    }

    .form-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .form-row {
      display: flex;
      gap: 1rem;

      mat-form-field {
        flex: 1;
      }
    }

    mat-form-field {
      width: 100%;
    }

    mat-dialog-actions {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e0e0e0;
      margin: 0;
      gap: 1rem;

      button {
        min-width: 100px;
      }
    }

    @media (max-width: 600px) {
      .form-row {
        flex-direction: column;
        gap: 0;
      }
    }
  `]
})
export class AddPatientModalComponent implements OnInit {
  patientForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddPatientModalComponent>,
    private formBuilder: FormBuilder
  ) {
    this.patientForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      birthDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.patientForm.valid) {
      const seed = Math.random().toString(36).substring(7);
      const newPatient: Patient = {
        id: Math.random().toString(36).substr(2, 9),
        ...this.patientForm.value,
        photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
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
