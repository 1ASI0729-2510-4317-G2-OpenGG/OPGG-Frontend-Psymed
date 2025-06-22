import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-note-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  template: `
    <div class="modal-container">
      <h2 mat-dialog-title>Agregar Nota</h2>

      <mat-dialog-content class="modal-content">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nota</mat-label>
          <textarea matInput [(ngModel)]="noteText" rows="4"
                    placeholder="Escribe una nota sobre el paciente..."></textarea>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button mat-raised-button color="primary"
                (click)="onSubmit()"
                [disabled]="!noteText.trim()">
          Guardar
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .modal-container {
      padding: 0;
      max-width: 500px;
    }

    h2 {
      margin: 0;
      padding: 1.5rem;
      color: #0a192f;
      font-size: 1.5rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .modal-content {
      padding: 1.5rem;
      overflow-y: auto;
    }

    .full-width {
      width: 100%;
    }

    mat-dialog-actions {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e0e0e0;
      margin: 0;
      gap: 1rem;
    }
  `]
})
export class AddNoteModalComponent {
  noteText: string = '';

  constructor(private dialogRef: MatDialogRef<AddNoteModalComponent>) {}

  onSubmit(): void {
    if (this.noteText.trim()) {
      this.dialogRef.close({
        text: this.noteText,
        date: new Date()
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
