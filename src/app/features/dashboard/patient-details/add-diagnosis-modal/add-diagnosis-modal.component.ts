import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Diagnosis } from '../../domain/patient.model';

@Component({
  selector: 'app-add-diagnosis-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  template: `
    <div class="modal-container">
      <div class="modal-header">
        <h2 mat-dialog-title>
          <mat-icon>psychology</mat-icon>
          Agregar Diagnóstico
        </h2>
        <button mat-icon-button (click)="onCancel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-dialog-content>
        <form [formGroup]="diagnosisForm" class="form-container">
          <mat-form-field appearance="outline">
            <mat-label>Diagnóstico general</mat-label>
            <textarea matInput formControlName="description" rows="4"
                      placeholder="Ingrese el diagnóstico general del paciente"></textarea>
            <mat-error *ngIf="diagnosisForm.get('description')?.hasError('required')">
              El diagnóstico es requerido
            </mat-error>
          </mat-form-field>

          <div formArrayName="tasks" class="tasks-section">
            <div class="tasks-header">
              <h3>Tareas del paciente</h3>
              <button mat-stroked-button type="button" (click)="addTask()">
                <mat-icon>add</mat-icon>
                Agregar tarea
              </button>
            </div>

            <div *ngFor="let task of tasks.controls; let i = index" [formGroupName]="i" class="task-item">
              <mat-form-field appearance="outline">
                <mat-label>Tarea {{i + 1}}</mat-label>
                <input matInput formControlName="title" placeholder="Descripción de la tarea">
                <button mat-icon-button matSuffix type="button" (click)="removeTask(i)">
                  <mat-icon>delete</mat-icon>
                </button>
                <mat-error *ngIf="task.get('title')?.hasError('required')">
                  La descripción de la tarea es requerida
                </mat-error>
              </mat-form-field>
            </div>
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
                [disabled]="!diagnosisForm.valid"
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
      gap: 24px;
    }

    .tasks-section {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
    }

    .tasks-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      h3 {
        margin: 0;
        color: #2c3e50;
        font-size: 1.1rem;
      }
    }

    .task-item {
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      mat-form-field {
        width: 100%;
      }
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
export class AddDiagnosisModalComponent {
  diagnosisForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddDiagnosisModalComponent>,
    private fb: FormBuilder
  ) {
    this.diagnosisForm = this.fb.group({
      description: ['', Validators.required],
      tasks: this.fb.array([])
    });
  }

  get tasks() {
    return this.diagnosisForm.get('tasks') as any;
  }

  addTask() {
    const taskForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false]
    });
    this.tasks.push(taskForm);
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }

  onSubmit() {
    if (this.diagnosisForm.valid) {
      const formValue = this.diagnosisForm.value;
      const diagnosis: Diagnosis = {
        id: Math.random().toString(36).substr(2, 9),
        description: formValue.description,
        diagnosisDate: new Date().toISOString(),
        tasks: formValue.tasks.map((task: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          ...task
        }))
      };
      this.dialogRef.close(diagnosis);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
