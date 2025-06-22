import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

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
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="profile-container">
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>Perfil del Doctor</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form class="profile-form">
            <mat-form-field appearance="outline">
              <mat-label>Nombre</mat-label>
              <input matInput [(ngModel)]="profile.name" name="name">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Apellido</mat-label>
              <input matInput [(ngModel)]="profile.lastName" name="lastName">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Especialidad</mat-label>
              <input matInput [(ngModel)]="profile.specialty" name="specialty">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" [(ngModel)]="profile.email" name="email">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Teléfono</mat-label>
              <input matInput [(ngModel)]="profile.phone" name="phone">
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-button color="warn" (click)="cancel()">Cancelar</button>
          <button mat-raised-button color="primary" (click)="save()">Guardar</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-card {
      padding: 2rem;
    }

    .profile-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }

    mat-card-title {
      color: #333;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    mat-form-field {
      width: 100%;
    }
  `]
})
export class DoctorProfileComponent {
  profile = {
    name: 'Dr. Juan',
    lastName: 'Pérez',
    specialty: 'Psiquiatría',
    email: 'juan.perez@example.com',
    phone: '123-456-789'
  };

  save() {
    console.log('Guardando perfil:', this.profile);
  }

  cancel() {
    this.profile = {
      name: 'Dr. Juan',
      lastName: 'Pérez',
      specialty: 'Psiquiatría',
      email: 'juan.perez@example.com',
      phone: '123-456-789'
    };
  }
}
